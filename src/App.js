import React, {useState, useEffect} from 'react';
import bridge from '@vkontakte/vk-bridge';
import {View, AdaptivityProvider, AppRoot, ConfigProvider, SplitLayout, SplitCol} from '@vkontakte/vkui';
import '@vkontakte/vkui/dist/vkui.css';

import Home from './panels/Home';


const App = () => {
    const [scheme, setScheme] = useState('bright_light')
    const [activePanel, setActivePanel] = useState('home');


    useEffect(() => {
        bridge.subscribe(({detail: {type, data}}) => {
            if (type === 'VKWebAppUpdateConfig') {
                setScheme(data.scheme)
            }
        });

    }, []);


    return (
        <ConfigProvider scheme={scheme}>
            <AdaptivityProvider>
                <AppRoot>


                    <Home id='home'/>

                </AppRoot>
            </AdaptivityProvider>
        </ConfigProvider>
    );
}

export default App;
