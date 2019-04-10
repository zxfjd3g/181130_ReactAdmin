import React, {Component} from 'react'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
  render() {
    return (
      <Editor
        editorStyle={{border: '1px solid #000', height: 200, padding: '0 10px'}}
      />
    )
  }
}