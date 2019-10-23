class User{
    constructor(req){
      this.db = req.db 
      this.session = req.session
      this.col = this.db.db().collection('user')
    }
    async create(obj) {
      const res = await this.col.insertOne(obj)
      return res.result.ok
    }
    async find(email) {
      const res = await this.col.find({'email':email}).toArray()
      return res[0]
    }
    async login(email,password) {
      const res = await this.col.find(
        {'email':email,'password':password}
      ).toArray()
      return res[0]
    }
}
module.exports.User = User

class Favor{
    constructor(req){
      this.db = req.db 
      this.session = req.session
      this.col = this.db.db().collection('favor')
    }
    async create(obj) {
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
      return await this.col.find().toArray() 
    }
}
module.exports.Favor = Favor
