import React, {useCallback, useEffect, useState} from "react"
import "./Form.css"
import {useTelegram} from "../../hooks/useTelegram"

const Form = () => {
    const [country, setCountry] = useState("")
    const [city, setCity] = useState("")
    const [subject, setSubject] = useState("")
    const {tg} = useTelegram()

    const onSendData = useCallback(() => {
        const data = {
            country,
            city,
            subject,
        }

        tg.sendData(JSON.stringify(data))
    }, [country, city, subject])

    useEffect(() => {
        tg.onEvent("mainButtonClicked", onSendData)

        return () => {
            tg.offEvent("mainButtonClicked", onSendData)
        }
    }, [onSendData])

    useEffect(() => {
        tg.MainButton.setParams({
            text: "Отправить данные"
        })
    }, [])

    useEffect(() => {
        if (!country || !city) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, city])

    const onCountryChange = (e) => {
        setCountry(e.target.value)
    }

    const onCityChange = (e) => {
        setCity(e.target.value)
    }

    const onSubjectChange = (e) => {
        setSubject(e.target.value)
    }

    return (
        <div className="form">
            <h3>Ваши данные</h3>
            <input className="input" type="text" placeholder="Страна" value={country} onChange={onCountryChange}/>
            <input className="input" type="text" placeholder="Город" value={city} onChange={onCityChange}/>
            <select value={subject} onChange={onSubjectChange} className="select">
                <option value="physical">Физ. лицо</option>
                <option value="legal">Юр. лицо</option>
            </select>
        </div>
    )
}

export default Form