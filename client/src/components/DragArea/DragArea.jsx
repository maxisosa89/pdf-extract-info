import React, { useState, useEffect, useReducer } from "react";
import { Widget } from "@uploadcare/react-widget";

export default function DragArea() {
    const [pdfUrl, setPdfUrl] = useState(null)
    const [dataPdf, setDataPdf] = useState(null)
    const [key, rerender] = useReducer(e => !e);

    useEffect(() => {
        if (pdfUrl) {
            fetch("http://localhost:3001/", pdfUrl).then(response => {
                response.json().then(e => {
                    setDataPdf(e)
                })
            })
        }
    },[pdfUrl])

    const alterLocale = () => ({
        buttons: {
          choose: {
            files: {
              one: "Seleccione o arrastre un PDF"
            }
          }
        },
        draghere: "Arrastre el archivo dentro del recuadro"
      })

    const onFileSelect = (e) => {
        if(e.name.substr(-3) === "pdf"){
            setPdfUrl(
                {
                    method: 'post',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ url: e.cdnUrl })
                }
            )
        }else {
            alert("El archvio debe tener extensión PDF")
            rerender();
            
        }
    }
    
    return (
        <div >
            {
                !dataPdf ?
                <div className="containerWidget">
                    <Widget
                        id='file'
                        key={key}
                        name='file'
                        tabs='file url'
                        publicKey={process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY}
                        onChange={onFileSelect}
                        localeTranslations={alterLocale()}
                    />
                </div>
                :
                <div className="containerResult">
                    <div className="containerPdf">
                        <embed src={dataPdf.url} type="application/pdf" width="100%" height="600px" />
                    </div>
                    <div className="containerMailsLinks">
                        <div className="containerBtn">
                            <button onClick={() => setDataPdf(null)}>Volver</button>
                        </div>
                        <div className="containerMails">
                            <h1>Mails</h1>
                            <ul>
                                {
                                    dataPdf.mails.map(e => (
                                        <li key={e}>{e}</li>
                                    ))
                                }
                            </ul>
                        </div>
                        <div className="containerLinks">
                            <h1>Links</h1>
                            <ul>
                                {
                                    dataPdf.webs.map(e => (
                                        <li key={e}>{e}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                    
                </div>
            }
        </div>
    )
}