import React from "react"
import ImageUploader from '../../components/imageUploader'

const postList = (props) => {
    return (
        props.postList.map((val, idx) => {
            let titrePost = `titrePost-${idx}`, description = `description-${idx}`,image = `image-${idx}`
            return (
                <tr key={val.index}>
                    <td>
                        <input type="text" name="titrePost" data-id={idx} id={titrePost} className="form-control " />
                    </td>
                    <td>
                        <textarea name="description" id={description} data-id={idx} className="form-control"></textarea>
                    </td>
                    <td>
                        <ImageUploader name='image' id={image} data_id={idx} />
                    </td>

                    <td>
                        {
                            idx === 0 ? <button onClick={() => props.add()} type="button" className="btn btn-warning text-center"><i className="fa fa-plus-circle" aria-hidden="true"></i></button>
                                : <button className="btn btn-danger" onClick={(() => props.delete(val))} ><i className="fa fa-minus" aria-hidden="true"></i></button>
                        }
                    </td>
                </tr >
            )
        })
    )
}
export default postList