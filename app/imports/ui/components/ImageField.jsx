import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

export type ImageFieldProps = HTMLFieldProps<string>;

/** Code retrieved from https://uniforms.tools/docs/tutorials-creating-custom-field/ */
function Image({ onChange }: ImageFieldProps) {
  return (
    <div className="ImageField">
      <label htmlFor="file-input">Upload an image</label>
      <input
        accept="image/*"
        id="file-input"
        onChange={({ target: { files } }) => {
          if (files && files[0]) {
            onChange(URL.createObjectURL(files[0]));
          }
        }}
        type="file"/>
    </div>
  );
}

export default connectField<ImageFieldProps>(Image);
