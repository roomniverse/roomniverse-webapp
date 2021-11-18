import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';
import { Segment } from 'semantic-ui-react';

export type ImageFieldProps = HTMLFieldProps<string, HTMLDivElement>;

/** Code retrieved from https://uniforms.tools/docs/tutorials-creating-custom-field/ */
function Image({ onChange }: ImageFieldProps) {
  return (
    <div className="ImageField">
      <Segment>
        <label htmlFor="file-input">
          <div>Upload an image</div>
        </label>
        <input
          accept="image/*"
          id="file-input"
          onChange={({ target: { files } }) => {
            if (files && files[0]) {
              onChange(URL.createObjectURL(files[0]));
            }
          }}
          type="file"/>
      </Segment>
    </div>
  );
}

export default connectField<ImageFieldProps>(Image);
