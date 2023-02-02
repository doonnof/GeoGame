import React, {useState} from 'react';

import {CellButton, Epic, Group, Panel, PanelHeader, View,} from '@vkontakte/vkui';

const Home = ({id}) => {
    const [activePanel, setActivePanel] = useState('panel1');
    console.log(activePanel)

    return <><View activePanel={activePanel}>
        <Panel id="panel1">
            <PanelHeader>Panel 1</PanelHeader>
            <Group>
                <div style={{height: 200}}/>
                <CellButton onClick={() => setActivePanel('panel2')}>Go to panel 2</CellButton>
                <div style={{height: 600}}/>
            </Group>
        </Panel>
        <Panel id="panel2">
            <PanelHeader>Panel 2</PanelHeader>
            <Group>
                <div style={{height: 200}}/>
                <CellButton onClick={() => setActivePanel('panel3')}>Go to panel 3</CellButton>
                <div style={{height: 600}}/>
            </Group>
        </Panel>
        <Panel id="panel3">
            <PanelHeader>Panel 3</PanelHeader>
            <Group>
                <div style={{height: 200}}/>
                <CellButton onClick={() => setActivePanel('panel1')}>Back to panel 1</CellButton>
                <div style={{height: 600}}/>
            </Group>
        </Panel>
    </View>
     {/*<Epic tabbar={}>*/}
     {/*    <></>*/}
     {/*</Epic>*/}
    </>
};


export default Home;
