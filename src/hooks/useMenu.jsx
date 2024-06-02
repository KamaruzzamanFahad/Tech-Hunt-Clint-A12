import { useEffect, useState } from "react"

const useMenu = (url, filter) => {
    const [menu, setmenu] = useState([])

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => {
                const populer = data.filter(singledata => singledata.category == filter)
                setmenu(populer)
            })
    }, [])
    return menu;
}

export default useMenu;