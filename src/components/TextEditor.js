// import React, { Component } from 'react';
// import { EditorState, convertToRaw } from 'draft-js';
// import { Editor } from 'react-draft-wysiwyg';
// // import draftToHtml from 'draftjs-to-html';
// // import htmlToDraft from 'html-to-draftjs';
// import {stateToHTML} from 'draft-js-export-html';

// export default class EditorConvertToHTML extends Component {
//   state = {
//     editorState: EditorState.createEmpty(),
//   }

//   onEditorStateChange=(editorState) => {
//     this.setState({
//       editorState,
//     });
//   };

//   render() {
//     const { editorState } = this.state;
//     return (
//       <div>
//         <Editor
//           editorState={editorState}
//           wrapperClassName="demo-wrapper"
//           editorClassName="demo-editor"
//           onEditorStateChange={this.onEditorStateChange}
//         />
//         <textarea
          
//           value={stateToHTML(editorState.getCurrentContent())}
//         />
//       </div>
//     );
//   }
// }


import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class App extends React.Component {
  handleEditorChange = (e) => {
    console.log(
      'Content was updated:',
      e.target.getContent()
    );
  }

  render() {
    return (
      <Editor
      apiKey="x7q4ksdohcl9thfcte5zhldg5rl8e6jxrkhw6563fkli7uat"
        initialValue="<p>Initial content</p>"
        init={{
          height: 500,
          menubar: false,
          image_title: true,
  /* enable automatic uploads of images represented by blob or data URIs*/
  automatic_uploads: true,

  content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
          plugins: [
            'advlist autolink lists link image',
            'charmap print preview anchor help',
            'searchreplace visualblocks code',
            'insertdatetime media table paste wordcount'
          ],
          toolbar:
            'undo redo | link image | formatselect | bold italic | \
            alignleft aligncenter alignright | \
            bullist numlist outdent indent | help'
        }}
        onChange={this.handleEditorChange}
      />
    );
  }
}

export default App;