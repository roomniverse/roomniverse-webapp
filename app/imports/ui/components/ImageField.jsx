/*
import React from 'react';
import { connectField, HTMLFieldProps } from 'uniforms';

type ImageProps = HTMLFieldProps<string, HTMLDivElement>;

/!** Code retrieved from https://uniforms.tools/docs/tutorials-creating-custom-field/ *!/
function Image({ onChange, value }: ImageProps) {
  return (
    <div className="ImageField">
      <label htmlFor="file-input">Upload an image</label>
      <input
        accept="image/!*"
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

const ImageField = connectField(Image);
export default ImageField;
*/
