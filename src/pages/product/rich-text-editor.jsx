import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Editor} from 'react-draft-wysiwyg';
import {EditorState, convertToRaw, ContentState} from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

/*
富文本编程器组件
 */
export default class RichTextEditor extends Component {

  static propTypes = {
    detail: PropTypes.string
  }

  state = {
    // 准备一个空的待编程的状态对象
    editorState: EditorState.createEmpty(),
  }

  getDetail = () => {
    const detail = draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
    return detail
  }

  onEditorStateChange = (editorState) => {
    console.log('onEditorStateChange()', editorState)
    this.setState({
      editorState,
    });
  }

  componentWillMount() {
    const {detail} = this.props
    if (detail) {
      // 根据传入detail标签字符串生成一个editorState, 并设置为状态数据
      const contentBlock = htmlToDraft(detail);
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      this.setState({
        editorState
      })
    }
  }

  render() {

    const {editorState} = this.state;
    return (
      <Editor
        editorState={editorState}
        editorStyle={{border: '1px solid #000', height: 200, padding: '0 10px'}}
        onEditorStateChange={this.onEditorStateChange}
      />
    )
  }
}