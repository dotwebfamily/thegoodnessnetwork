const debug = require('debug')
const {ObjectId} = require('mongodb');
class User{
  constructor(req){
    this.db = req.db 
    this.session = req.session
    this.col = this.db.db().collection('user')
    this.ldebug = debug('app/models/user')
  }
  async create(obj) {
    obj.coins = 0
    const res = await this.col.insertOne(obj)
    return res.result.ok
  }
  async find(email) {
    const res = await this.col.find({'email':email}).toArray()
    return res[0]
  }
  async login(email,password) {
    this.ldebug('login', email, password)
    const res = await this.col.find(
      {'email':email,'password':password}
    ).toArray()
    this.ldebug('login-result',res[0])
    return res[0]
  }
  async findAll() {
    return await this.col.find().toArray() 
  }
  async byDomain(domain) {
    const res = await this.col.find({
      'email':{
        '$regex':`@${domain}\$`
      }
    }).toArray()
    this.ldebug(res)
    return res
  }
}
module.exports.User = User

class Organization{
  constructor(req){
    this.db = req.db 
    this.session = req.session
    this.col = this.db.db().collection('organization')
    this.ldebug = debug('app/models/organization')
  }
  async create(obj) {
    const res = await this.col.insertOne(obj)
    return res.result.ok
  }
  async find(domain) {
    const res = await this.col.find({'domain':domain},{_id:-1,password:-1}).toArray()
    this.ldebug(res[0])
    return res[0]
  }
}
module.exports.Organization = Organization

class Favor{
  constructor(req){
    this.db = req.db 
    this.session = req.session
    this.col = this.db.db().collection('favor')
    this.ldebug = debug('app/models/favor')
  }
  async create(obj) {
    const user = this.db.db().collection('user')
    const email = this.session.email
    const myUser = await user.find({'email':email}).toArray()
    if (myUser[0].coins < obj.coins)
      return -1
    obj.creator = this.session.email 
    obj.status = 'open'
    const newCoins = myUser[0].coins - obj.coins
    const [res1,res2] = await Promise.all([
      this.col.insertOne(obj),
      user.updateOne({'email':email},{'$set': {coins: newCoins}}),
    ])
    return res1.result.ok && res2.result.nModified
  }
  async fromDomain(obj) {
    obj.organization = true
    obj.creator = this.session.email 
    obj.status = 'open'
    const res = await this.col.insertOne(obj)
    return res.result.ok
  }
  async find(id) {
    const res = await this.col.find({'_id':id}).toArray() 
    return res[0]
  }
  async findMine(id) {
    const res = await this.col.find(
      {'_id':id,'creator':this.session.email}
    ).toArray() 
    return res[0]
  }
  async findAll() {
    const domain = this.session.organization
    return await this.col.find({
      'creator':{
        '$regex':`@${domain}\$`
      }
    }).toArray() 
  }
  async findAllOpen() {
    const domain = this.session.organization
    return await this.col.find({
      'creator':{
        '$regex':`@${domain}\$`
      },
      status: 'open'
    }).toArray() 
  }
  async findAllDoing() {
    const domain = this.session.organization
    return await this.col.find({
      doer: this.session.email
    }).toArray() 
  }
  async findAllGiven() {
    const domain = this.session.organization
    return await this.col.find({
      creator: this.session.email
    }).toArray() 
  }
  async search(search) {
    const domain = this.session.organization
    return await this.col.find({
      '$or':[
        {
          'title': {
            '$regex':`${search}`,
            '$options': 'i'
          }
        },
        {
          'description': {
            '$regex':`${search}`,
            '$options': 'i'
          },
        }
      ],
      'creator':{
        '$regex':`@${domain}\$`,
      },
      status: 'open'
    }).toArray() 
  }
  async byDomain(domain) {
    const res = await this.col.find({
      'creator':{
        '$regex':`@${domain}\$`
      },
      organization: true
    }).toArray()
    this.ldebug(res)
    return res
  }
  async accept(id) {
    this.ldebug(id)
    const res = await this.col.updateOne({
      _id:ObjectId(id)
    },{
      $set: { 
        status: 'accepted',
        doer: this.session.email 
      }
    })
    this.ldebug(res.result.nModified)
    return res.result.nModified
  }
  async done(id) {
    this.ldebug(id)
    const res = await this.col.updateOne({
      _id:ObjectId(id)
    },{
      $set: { 
        status: 'done',
      }
    })
    this.ldebug(res.result.nModified)
    return res.result.nModified
  }
  async notDone(id) {
    this.ldebug(id)
    const res = await this.col.updateOne({
      _id:ObjectId(id)
    },{
      $set: { 
        status: 'accepted',
      }
    })
    this.ldebug(res.result.nModified)
    return res.result.nModified
  }
  async completed(id) {
    this.ldebug(id)
    const res1 = await this.col.findOneAndUpdate({
      _id:ObjectId(id)
    },{
      $set: { 
        status: 'completed',
      }
    })
    const user = this.db.db().collection('user')
    const value = res1.value
    const res2 = await user.updateOne({'email':value.doer},{
      $inc:{coins: parseInt(value.coins)}
    })
    return res1.ok && res2.result.nModified
  }
}
module.exports.Favor = Favor
