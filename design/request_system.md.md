# Request System


## Frontend
### Views

### Components

## Backend

### ApiRoutes

### Models
  - Request
      user: { type: Schema.Types.ObjectId, ref: "user" },
      title: String,
      description: String,
      cost: Number,
      reputation_req: Number,
      tags: [String],
      priority: Number,
      is_perma: { type: Boolean, default: true },
      deadline: Date,
      reposts: { type: Number, default: 0 },
      posted_at: { type: Date, default: Date.now },
      created_at: { type: Date, default: Date.now }
