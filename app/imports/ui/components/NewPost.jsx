import React from 'react';
import { Posts } from '../../api/social/Posts';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'simpl-schema/dist/SimpleSchema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorField, SubmitField, TextField } from 'uniforms-semantic';
import { HTMLFieldProps, connectField } from 'uniforms';

type ImageProps = HTMLFieldProps<string, HTMLDivElement>;

const formSchema = new SimpleSchema({
  extraText: String,
  extraImages: Array,
});

/** Code retrieved from https://uniforms.tools/docs/examples-custom-fields */
function Image({ onChange }: ImageProps) {
  return (
    <input
      accept="image/*"
      id="file-input"
      onChange={({ target: { files } }) => {
        if (files && files[0]) {
          onChange(URL.createObjectURL(files[0]));
        }
      }}
      type="file"/>
  );
}

const ImageField = connectField(Image);
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
        <TextField name='extraText' placeholder="What's on your mind?"/>
        <ImageField name='extraImage'/>
        <SubmitField value='Create Post'/>
        <ErrorField/>
      </AutoForm>
    );
  }
}

export default NewPost;
