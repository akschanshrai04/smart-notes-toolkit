import {
  DiagramComponent,
  DataBinding,
  MindMap,
  Inject,
  LayoutModel,
  NodeModel,
  ConnectorModel,
  Diagram,
  DiagramTools
} from '@syncfusion/ej2-react-diagrams';
import { DataManager } from '@syncfusion/ej2-data';
import React, { useEffect, useRef } from 'react';

// lib/syncfusion-license.ts
import { registerLicense } from '@syncfusion/ej2-base';

registerLicense('Ngo9BigBOggjHTQxAR8/V1NNaF5cXmBCekx3THxbf1x1ZFRGal1QTnNeUiweQnxTdEBjXX5ccXRUR2VdUkVzWElfag==');


interface MindmapProps {
  data: any[]; // Define the type of data if possible
}

const Mindmap: React.FC<MindmapProps> = ({ data }) => {
  const dataManager = new DataManager(data);
  const diagramRef = useRef<DiagramComponent | null>(null);
  
  const layout: LayoutModel = {
    type: 'MindMap',
    orientation: 'Horizontal', // 'Vertical'
    verticalSpacing: 50,
    horizontalSpacing: 50 // 40 (_For_Vertical_)
  };

  // Apply dark theme to diagram after rendering
  useEffect(() => {
    if (diagramRef.current) {
      diagramRef.current.backgroundColor = '#ffffff'; // dark background
    }
  }, []);

  /**
   * 
   * @param node - NodeModel
   * @returns 
   */
  const getNodeDefaults = (node: NodeModel) => {
    node.height = 40;
    node.width = 150;
    const branch = (node.data as any).branch;
    node.annotations = [{ content: (node.data as any).Label, style: { color: "white" } }];
    
    // Use modern bluish colors for the mind map nodes
    if (branch === "Root" || branch === "Left" || branch === "Right") {
      node.shape = branch !== "Root" ? { type: "Basic", shape: "Ellipse" } :
        { type: "Path", data: `M55.7315 17.239C57.8719 21.76 54.6613 27.788 47.1698 26.0787C46.0997 32.309 33.2572 35.323 28.9764 29.2951C25.7658 35.323 10.7829 33.816 10.7829 26.0787C3.29143 30.802 -0.989391 20.253 2.22121 17.239C-0.989317 14.2249 2.22121 6.68993 10.7829 8.39934C13.9935 -0.845086 25.7658 -0.845086 28.9764 5.18301C32.187 0.661909 45.0294 0.661908 47.1698 8.39934C52.5209 5.18301 60.0123 12.7179 55.7315 17.239Z` };
      node.style = { fill: branch !== "Root" ? "#3b82f6" : "#60a5fa", strokeWidth: 0 };
    } else {
      node.style = { fill: branch === "subRight" ? "#2563eb" : "#3b82f6", strokeWidth: 0 };
    }
    
    node.ports = [
      { id: 'port1', offset: { x: 0, y: 0.5 } },
      { id: 'port2', offset: { x: 1, y: 0.5 } },
    ];
    
    node.expandIcon = { shape: "Minus" };
    node.collapseIcon = { shape: "Plus" };
    
    return node;
  };

  /**
   * 
   * @param connector - ConnectorModel
   * @param diagram - DiagramComponent (Ej2 Diagram Instance)
   * @returns 
   */
  const getConnectorDefaults = (connector: ConnectorModel, diagram: DiagramComponent) => {
    connector.type = "Bezier";
    connector.targetDecorator = { shape: "None" };
    connector.style = { strokeWidth: 2 };

    if (connector.sourceID && connector.targetID) {
      const sourceNode = diagram.getObject(connector.sourceID) as NodeModel | null;
      const targetNode = diagram.getObject(connector.targetID) as NodeModel | null;

      if (sourceNode && targetNode) {
        const branch = (targetNode as any).data.branch;

        if (sourceNode.ports && sourceNode.ports.length > 1 && targetNode.ports && targetNode.ports.length > 1) {
          if (branch === "Left" || branch === "subLeft") {
            connector.style.strokeColor = "#60a5fa";
            connector.sourcePortID = sourceNode.ports[0].id;
            connector.targetPortID = targetNode.ports[1].id;
          } else if (branch === "Right" || branch === "subRight") {
            connector.style.strokeColor = "#3b82f6";
            connector.sourcePortID = sourceNode.ports[1].id;
            connector.targetPortID = targetNode.ports[0].id;
          }
        }
      }
    }
    return connector;
  };

  return (
    <div className="animate-fadeIn">
      <DiagramComponent
        id="mindmap-diagram"
        ref={diagramRef}
        height={"600px"}
        width={"100%"}
        backgroundColor="#ffffff"
        snapSettings={{ constraints: 0 }}
        tool={DiagramTools.ZoomPan}
        dataSourceSettings={{
          id: 'id',
          parentId: 'parentId',
          dataManager: dataManager
        }}
        layout={layout}
        getNodeDefaults={getNodeDefaults}
        getConnectorDefaults={getConnectorDefaults}
        className="transition-opacity duration-500"
      >
        <Inject services={[MindMap, DataBinding]}></Inject>
      </DiagramComponent>
    </div>
  );
};

export default Mindmap;