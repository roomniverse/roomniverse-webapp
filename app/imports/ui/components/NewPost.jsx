import React from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorField, SubmitField } from 'uniforms-semantic';
import { TextArea } from 'semantic-ui-react';
// import { connectField } from 'uniforms';
import { Posts } from '../../api/social/Posts';
// import ImageField from './ImageField';

const formSchema = new SimpleSchema({
  extraText: String,
  extraImages: String,
});

// const ImageField = connectField(Image);
const bridge = new SimpleSchema2Bridge(formSchema);

/** Create a new Social Post */
class NewPost extends React.Component {
  submit(data, formRef) {
    const { extraText, extraImages } = data;
    const userImage = 'images/default-image.jpeg';
    const userName = Meteor.user().username;
    const date = Date.now();
    const summary = `${userName} posted on their page`;
    const meta = '0 Likes';

    Posts.collection.insert({ userImage, userName, date, summary, extraText, extraImages, meta },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Item added successfully', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
        <TextArea name='extraText' placeholder="What's on your mind?"/>
        {/*
        <ImageField name='extraImage'/>
*/}
        <SubmitField value='Create Post'/>
        <ErrorField errorMessage="Please write or upload something."/>
      </AutoForm>
    );
  }
}

export default NewPost;
