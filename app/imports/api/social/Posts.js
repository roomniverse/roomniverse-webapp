import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The PostsCollection. It encapsulates state and variable values for post.
 */
class PostsCollection {
  constructor() {
    this.name = 'PostsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      date: SimpleSchema.oneOf({
        type: String,
      }, {
        type: SimpleSchema.Integer,
      }),
      avatar: String,
      meta: SimpleSchema.Integer,
      summary: String,
      owner: String,
      extraText: {
        type: String,
        optional: true,
      },
      extraImages: {
        type: Array,
        optional: true,
      },
      'extraImages.$': {
        type: String,
        optional: true,
      },
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.username`;
  }
}

/**
 * The singleton instance of the PostsCollection.
 */
export const Posts = new PostsCollection();
