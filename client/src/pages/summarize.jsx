import { useEffect } from "react";

function Summarize() {

    useEffect(()=>{
        console.log(import.meta.env.VITE_APP_BACKEND)
    })

    function handleSubmit(event){
        event.preventDefault();
        let file = document.querySelector("#file").files[0]
        let phone = document.querySelector("#phone").value;
        console.log(phone)
        let formData = new FormData()
        formData.append("phone",phone);
        formData.append("file",file);
        console.log(formData)
        fetch(`${import.meta.env.VITE_APP_BACKEND}/api/pdf`,{
            method: "post",
            body:formData,
        }).then(res=>res.json())
        .then(data=>console.log(data.message))
    }
    return (
        <>
            <h1 className="text-5xl my-2">Summarize Your Pdf</h1>
            <form onSubmit={handleSubmit}>
                <fieldset className="my-2">
                    <label htmlFor="phone" className="text-xl">Enter your phone number : </label>
                    <input name="phone" id="phone" type="number" required></input>
                </fieldset>
                <fieldset className="my-2">
                    <label htmlFor="phone">Enter your pdf file : </label>
                    <input name="file" accept=".pdf" id="file" type="file" required></input>
                </fieldset>
                <button type="submit" className="">submit</button>
            </form>
        </>
    )
}

export default Summarize;
