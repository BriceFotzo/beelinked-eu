import React from "react"
import ImageUploader from './imageUploader'

const formationList = (props) => {
    return (
        props.formationList.map((val, idx) => {
            let titreFormation = `titreFormation-${idx}`, description = `description-${idx}`,image = `image-${idx}`
            return (
                <tr key={val.index}>
                    <td>
                        <input type="text" name="titreFormation" data-id={idx} id={titreFormation} className="form-control " />
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
export default formationList