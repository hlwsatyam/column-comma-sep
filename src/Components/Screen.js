import React, { useState, useEffect } from 'react'
import Logo from '../Components/Images/Logo.png'
import Frame from '../Components/Images/Frame.png'
import vec2 from '../Components/Images/Vector 2.png'
import Frame1 from '../Components/Images/F1.png'
import v3 from '../Components/Images/v3.png'
import XMLID_1_ from '../Components/Images/XMLID_1_.png'

import copy from 'copy-to-clipboard'

import * as XLSX from 'xlsx';

import './Screen.css'

function Screen() {

    const [inputVal, setInputVal] = useState("")
    const [showSetting, setShowSetting] = useState(false)

    const [commaSeparatedWords, setCommaSeparatedWords] = useState('');
    const [pasteData, setPasteData] = useState('');

    const [setting, setSetting] = useState({
        Delimiter: ',',
        // StartingPrefix: '5252'
    })

    useEffect(() => {
        setPasteData(inputVal);
        try {
            const workbook = XLSX.read(inputVal, { type: 'string' });

            const worksheet = workbook.Sheets[workbook.SheetNames[0]];

            const cellValues = XLSX.utils.sheet_to_json(worksheet, { header: 1, raw: true });

            const words = cellValues.flat().filter(Boolean);

            const commaSeparated = words.join(setting.Delimiter);

            setCommaSeparatedWords(commaSeparated);
        } catch (error) {
            setCommaSeparatedWords('Invalid Excel data');
        }
    }, [inputVal])

    const copyToBoard = () => {
        copy(commaSeparatedWords)
        setInputVal('')
    }

    return (
        <div className="tool-body"  >

            {/* // Header Start */}
            < section className="container-fluid text-center">
                {/* logo panel Start*/}

                < header className='p-3' > <img src={Logo} alt="Edureify" />   </ header>

                {/* logo panel  End*/}

                < div className="base-head ">

                    <div className="left  p-3 ">
                        <img className='img-fluid frame p-4  ' src={Frame} alt="Eduireify" />

                    </div>
                    <div className="right p-2 ">
                        <p>Welcome To<span id='highight' > Tool By Edureify</span>  </p>
                        <h2>CONVERT COLUMN TO COMMA SEPARATED LIST  </h2>
                        <img className='v3' src={v3} alt="Eduireify" />
                    </div>
                </div>
                

            </section >
            {/* Header End */}

            {/* // setting Start--- */}
            <section className="container-fluid text-center">
                <img className='img-fluid Frame1 ' src={Frame1} alt="Eduireify" />
                < div className="vec-2 ">

                    <div className="left">
                        <img className='img-fluid' src={vec2} alt="Eduireify" />
                    </div>
                    <div className="middle">
                        <p>CONVERT COLUMN TO COMMA SEPARATED LIST  </p>

                    </div>
                    <div className="right">
                        <i onClick={() => {
                            if (showSetting) {
                                setShowSetting(false)
                            } else {
                                setShowSetting(true)
                            }
                        }} className="fa fa-cog border p-2 setting " >  </i>
                    </div>
                </div>

                {
                    showSetting ? <p className='water-c border'  > <span>Delimiter : </span> <input
                        value={setting.Delimiter} onChange={(e) => {
                            setSetting({ Delimiter: e.target.value })
                        }
                        } type="text" />
                    </p> : null
                }

            </section>
            {/* // setting End--- */}

            {/* // inp Start */}
            <section className="container-fluid  text-center">
                <div className="row pt-0 p-5 ">

                    <div className=" textarea  col-md-6">

                        <textarea value={inputVal} onChange={(e) => setInputVal(e.target.value)} placeholder='Enter (or paste) your column of data here' className=" water-c rounded " name="" id="" cols="30" rows="10"></textarea>

                    </div>

                    <div className=" textarea2   col-md-6 ">
                        <textarea value={commaSeparatedWords} placeholder='Your comma separated list of data will appear here' className=" aqua-c rounded " name="" id="" cols="30" rows="10"></textarea>
                        <i onClick={copyToBoard} class=" copy-icon border rounded p-1 fa-solid fa-copy"></i>
                    </div>
                </div>
            </section>
            {/* // inp End */}

            {/* // tip Start */}
            <section className=" vec-1 container-fluid text-center">
                <div className="row text-right ">
                    <div className=" col-md-6  tips-header ">
                        <h6 className='    '   >
                            USE THIS TOOL TO
                        </h6>
                        <h6 className='    '   >
                            CONVERT A COLUMN INTO A
                        </h6>
                        <h6 className='    '   >
                            COMMA SEPARATED LIST
                        </h6>
                    </div>
                    <div className=" text-left  col-md-6 ">
                        <ol>
                            <li>Copy your column of text in Excel</li>
                            <li>Paste the column here (into the leftmost textbox)</li>
                            <li>Copy your comma separated list from the rightmost textbox</li>
                            <li>Paste your comma separated list wherever you wish</li>
                        </ol>
                    </div>
                </div>
            </section>
            {/* // tip End */}

            {/* footer Starts */}
            <footer>

                <h6>Copyright &#169; 2023 Tool By Edureify | Product of Edureify</h6>
            </footer>
            {/* footer Ends */}

        </div>
    )
}

export default Screen