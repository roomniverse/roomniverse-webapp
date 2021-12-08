import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

class RequestsCollection {
  constructor() {
    this.name = 'RequestsCollection';
    this.collection = new Mongo.Collection(this.name);
    this.schema = new SimpleSchema({
      firstName: String,
      lastName: String,
      gender: {
        type: String,
        allowedValues: ['Male', 'Female', 'Other'],
      },
      location: String,
      avatar: String,
      description: String,
      owner: String,
      major: {
        type: String,
        allowedValues: ['ICS/CENG', 'Other'],
      },
      gradYear: String,
    }, { tracker: Tracker });
    this.collection.attachSchema(this.schema);
    this.userPublicationName = `${this.name}.publication.user`;
    // this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

export const Requests = new RequestsCollection();
