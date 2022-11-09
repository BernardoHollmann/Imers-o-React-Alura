import React from "react";

export const colorModeContext = React.createContext({
    mode: "",
    setMode: () => {alert('você precisa me configurar primeiro')}
})

export default function ColorModeProvider(props) {

    const [mode, setMode] = React.useState(props.initialMode)

    return (
        //Entender pq está sendo ignorado?
        <colorModeContext.Provider value={{mode: mode, setMode: setMode}}>
            {props.children}
        </colorModeContext.Provider>
    )
}