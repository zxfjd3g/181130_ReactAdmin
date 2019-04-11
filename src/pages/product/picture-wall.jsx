import React, {Component} from 'react'
import { Upload, Icon, Modal } from 'antd';

/*
操作商品图片的照片墙组件
 */
export default class PicturesWall extends Component {
  state = {
    previewVisible: false, // 是否显示大图预览
    previewImage: '', // 可以预览的大图url
    // file: 代表一个上传文件的相关信息的对象
    fileList: [],
  };

  // 获取所有已上传图片文件名的数组
  getImgs = () => {
    return this.state.fileList.map(file => file.name)
  }

  // 取消大图预览(隐藏Modal)
  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    console.log('handlePreview', file)
    this.setState({
      previewImage: file.url,
      previewVisible: true,
    });
  }

  /*
  文件状态改变的监听回调
    上传中、完成、失败, 删除
  */
  handleChange = ({ fileList }) => {

    // 取出上传的file
    const file = fileList[fileList.length-1]
    console.log('handleChange()', file.status, file)
    if(file.status==='done') { // 上传文件成功
      // 将上传文件的文件名和url保存到file上
      const {name, url} = file.response.data
      file.name = name
      file.url = url
    }

    this.setState({
      fileList
    })
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <div>
        {/*
        action: 指定上传的后台处理url
        listType: 显示的样式效果
        fileList: 所有上传图片的相关信息对象的数组
        name: 请求参数的参数名
        onPreview: 点击预览的回调
        onChange:
        */}
        <Upload
          action="/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          name='image'
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {fileList.length >= 3 ? null : uploadButton}
        </Upload>


        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}