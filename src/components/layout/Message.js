import { useState, useEffect } from 'react'

import Styles from '../css/Message.module.css'

export const Message = ({type, msg}) => {

    const [visible, setVisible] = useState(false)

    useEffect(() => {

        if (!msg) {
            setVisible(false)
            return
        } else if (msg) {
            setVisible(true)
            return
        }

        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${Styles.msg} ${Styles[type]}`}>
                    <p>{msg}</p>
                </div>
            )}
        </>
    )
}