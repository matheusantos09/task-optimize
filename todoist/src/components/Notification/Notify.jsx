import React from 'react'
import {ToastContainer, toast} from 'react-toastify'

export const ToastContainerCustom = () => (
    <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover/>
)

export function notify(data) {
    switch (data.status) {
        case 'default':
            toast(data.msg, {
                position: "bottom-right",
                autoClose: data.time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break

        case 'error':
            toast.error(data.msg, {
                position: "bottom-right",
                autoClose: data.time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break

        case 'success':
            toast.success(data.msg, {
                position: "bottom-right",
                autoClose: data.time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break

        case 'warn':
            toast.warn(data.msg, {
                position: "bottom-right",
                autoClose: data.time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break

        case 'info':
            toast.info(data.msg, {
                position: "bottom-right",
                autoClose: data.time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break

        default:
            toast(data.msg, {
                position: "bottom-right",
                autoClose: data.time,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            break
    }
}