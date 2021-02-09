import React from 'react';
import { Editor } from '@tinymce/tinymce-react';


class EditorList extends React.Component {
    constructor(props) {
        super(props);
      }
    handleEditorChange = (id,e) => {
        this.props.onContentChange(id,e.target.id,e.target.getContent())
        // console.log(
        //     'Content was updated:',document.getElementById('titreSection').value
        // );
    }
    render(){
        return (
            this.props.editionList.map((val, idx) => {
                // let titreFormation = `titreFormation-${idx}`, chapitre = `chapitre-${idx}`, contenu = `contenu-${idx}`
                return (
                    <tr key={idx}>
                        <td>
                        <div className="form-group">
                                                <label className="required">Titre de section</label>
                                                <input type="text" name="titreSection" id={"titreSection"+idx} className="form-control"/>
                        </div>   
                        <Editor
                            idx={idx}
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
                            onChange={(e) => this.handleEditorChange("titreSection"+idx, e)}
                        />
                        
                            {
                                idx === 0 ? <button onClick={(e) =>{this.props.add()
                                console.log('event in EditorList',e)} } type="button" className="btn btn-warning text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                    : <button className="btn btn-danger" onClick={(() => this.props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                            }
                        </td>
                    </tr >
                )
            })
        )
    }

}
export default EditorList