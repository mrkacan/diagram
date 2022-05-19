import './App.css';
import {ReactDiagram} from 'gojs-react';
import * as go from 'gojs';

function App() {

    const initDiagram = () => {
        const $ = go.GraphObject.make;
        const diagram =
            $(go.Diagram,
                {
                    'clickCreatingTool.archetypeNodeData': {text: 'new node', color: 'lightblue'},
                    model: new go.GraphLinksModel(
                        {
                            linkKeyProperty: 'key'
                        })
                });

        // define a simple Node template
        diagram.nodeTemplate =
            $(go.Node, 'Auto',  // the Shape will go around the TextBlock
                new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
                $(go.Shape, 'RoundedRectangle',
                    {name: 'SHAPE', fill: 'white', strokeWidth: 0},
                    // Shape.fill is bound to Node.data.color
                    new go.Binding('fill', 'color')),
                $(go.TextBlock,
                    {margin: 8, editable: false, click: onItemClick},  // some room around the text
                    new go.Binding('text').makeTwoWay()
                )
            );

        return diagram;
    }

    const onItemClick = (event, object) => {
        alert(`You have clicked to ${object.panel.data.text}`)
    }

    return (
        <div className="App">
            <ReactDiagram
                initDiagram={initDiagram}
                divClassName='diagram-component'
                nodeDataArray={[
                    {key: 0, text: 'Element A', color: 'lightblue', loc: '0 0'},
                    {key: 1, text: 'Element B', color: 'orange', loc: '150 0'},
                    {key: 2, text: 'Element C', color: 'lightgreen', loc: '0 150'},
                ]}
                linkDataArray={[
                    {key: -1, from: 0, to: 1},
                    {key: -2, from: 0, to: 2},
                    {key: -3, from: 1, to: 2},
                ]}
            />
        </div>
    );
}

export default App;
