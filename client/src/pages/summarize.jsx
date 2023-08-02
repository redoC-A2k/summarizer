import { useEffect, useState } from "react";

function Summarize() {
    const [summary, setSummary] = useState("")
    useEffect(() => {
        console.log(import.meta.env.VITE_APP_BACKEND)
    }, [])

    function handleSubmit(event) {
        event.preventDefault();
        let file = document.querySelector("#file").files[0]
        let phone = document.querySelector("#phone").value;
        console.log(phone)
        let formData = new FormData()
        formData.append("phone", phone);
        formData.append("file", file);
        console.log(formData)
        fetch(`${import.meta.env.VITE_APP_BACKEND}/api/pdf`, {
            method: "post",
            body: formData,
        }).then(res => res.json())
            .then(data => {
                console.log(data.message)
                setSummary(data.message)
            })
    }
    return (
        <>
            <div className="row">
                <div className="col-12">
                    <h1>Summarize Your Pdf</h1>
                    {summary ?
                        <div className="row">
                            <div className="col-12">
                                <p>{summary}</p>
                            </div>
                        </div>
                        :
                        <div className="row">
                            <div className="col-12">
                                <form onSubmit={handleSubmit}>
                                    <fieldset >
                                        <label className="col-12 col-md-6" htmlFor="phone">Enter your phone number (in 10 digits) : </label>
                                        <input name="phone" className="col-12 col-md-6 " id="phone" type="text" pattern="[789][0-9]{9}" required></input>
                                    </fieldset>
                                    <fieldset >
                                        <label className="col-12 col-md-6" htmlFor="phone">Enter your pdf file : </label>
                                        <input className="col-12 col-md-6" name="file" accept=".pdf" id="file" type="file" required></input>
                                    </fieldset>
                                    <button className="btn btn-success ml-4" type="submit">submit</button>
                                </form>
                            </div>
                        </div>
                    }

                </div>
            </div>
        </>
    )
}

export default Summarize;
