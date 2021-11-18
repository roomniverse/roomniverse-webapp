import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import ImageField from '../../ui/components/ImageField';

class PostsCollection {
  constructor() {
    this.name = 'PostsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      image: {
        type: String,
        uniforms: { component: ImageField },
      },
      user: String,
      date: String,
      summary: String,
      extraText: { type: String, defaultValue: '' },
      extraImages: {
        type: String,
        uniforms: ImageField },
      meta: String,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Posts = new PostsCollection();
