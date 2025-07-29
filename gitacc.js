/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import './App.scss';
// TODO: remove prime import. follow only antd design
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';
import { Layout, Menu } from 'antd';
import React, { useState, Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
// import '../node_modules/react-grid-layout/css/styles.css';
// import '../node_modules/react-resizable/css/styles.css';

import {
  LayoutOutlined,
  CodeOutlined,
  PullRequestOutlined,
  SwapOutlined,
  DiffOutlined,
  ExclamationCircleOutlined,
  KeyOutlined,
  PlayCircleOutlined,
  TeamOutlined,
} from '@ant-design/icons';

import { createContext } from 'react';
import FloatingButton from './ChatBot/FloatingButton/FloatingButton.jsx';
import { useNavigate } from 'react-router-dom';

const { Content, Sider } = Layout;

const AgentTable = lazy(() => import('./features/personas/AgentTable.jsx'));
const FunctionTable = lazy(() => import('./features/functions/FunctionTable.jsx'));
const ApiTable = lazy(() => import('./features/apis/ApiTable.jsx'));
const MicroAppTable = lazy(() => import('./features/microApp/MicroAppTable.jsx'));
const EmbeddingTable = lazy(() => import('./features/embeddings/EmbeddingTable.jsx'));

const WorkflowTable = lazy(() => import('./features/workflow/WorkflowTable.jsx'));
const Guardrails = lazy(() => import('./features/guardrails/index.jsx'));
const Cyphers = lazy(() => import('./features/cyphers/index.jsx'));

const PromptScreen = lazy(() => import('./features/personas/PromptScreen.jsx'));
const FunctionForm = lazy(() => import('./features/functions/FunctionForm.jsx'));
const ApiForm = lazy(() => import('./features/apis/ApiForm.jsx'));
const MicroAppForm = lazy(() => import('./features/microApp/MicroAppForm.jsx'));
const EmbeddingForm = lazy(() => import('./features/embeddings/EmbeddingForm.jsx'));
const ReactWorkflow = lazy(() => import('./features/workflow/ReactWorkflow/ReactWorkflow.jsx'));

function getItem(label, key, icon, children) {
  return {
    key,
    icon: React.createElement(icon),
    children,
    label,
  };
}

// sidebar menu items
const items = [
  getItem('Micro App', 'microapp', LayoutOutlined),
  getItem('Workflow', 'workflow', PullRequestOutlined),
  getItem('Personas', 'personas', TeamOutlined),
  getItem('Function', 'functions', CodeOutlined),
  getItem('API', 'apis', SwapOutlined),
  getItem('KAG', 'embedding', DiffOutlined),
  getItem('Guardrails', 'guardrails', ExclamationCircleOutlined),
  getItem('Cypher', 'cypher', KeyOutlined),
  getItem('Testing', 'testing', PlayCircleOutlined),
];

export const formContext = createContext([]); // TODO: needs to remove this context

function App() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const getImagePath = (value) => {
    try {
      let imagePath = require(`./assets/images/${value}.PNG`);
      return imagePath;
    } catch (err) {
      console.error('Image not found:', err);
      let imagePath = null;
      return imagePath;
    }
  };

  const handleMenuSelect = (selectedKey) => {
    navigate(selectedKey.key);
  };

  return (
    <div className="App" style={{ width: '100vw', height: '100vh' }}>
      <Layout
        style={{
          minHeight: '100vh',
        }}
      >
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} theme="light">
          <div style={{ display: 'flex', margin: '1rem' }}>
            <div>
              <img src={getImagePath('appLogo')} alt="logo" />
            </div>

            <div
              style={{
                display: collapsed ? 'none' : 'block',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                fontSize: '1.2rem',
                marginTop: '1.3vh',
              }}
            >
              APP NAME
            </div>
          </div>

          <div className="demo-logo-vertical" style={{ marginTop: '3vh' }} />
          <Menu theme="light" defaultSelectedKeys={['/']} mode="inline" items={items} onSelect={handleMenuSelect} />
        </Sider>
        <Layout>
          <Content className="main-content-layout">
            <div>
              <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                  <Route path="/" element={<MicroAppTable />}></Route>

                  <Route path="workflow" element={<Outlet />}>
                    <Route index element={<WorkflowTable />}></Route>
                    <Route path="new" element={<ReactWorkflow />}></Route>
                    <Route path=":id/edit" element={<ReactWorkflow />}></Route>
                  </Route>
                  <Route path="personas" element={<Outlet />}>
                    <Route index element={<AgentTable />}></Route>
                    <Route path=":id/prompt" element={<PromptScreen />} />
                  </Route>
                  <Route path="functions" element={<Outlet />}>
                    <Route index element={<FunctionTable />}></Route>
                    <Route path="new" element={<FunctionForm />}></Route>
                    <Route path=":id/edit" element={<FunctionForm />}></Route>
                  </Route>
                  <Route path="apis" element={<Outlet />}>
                    <Route index element={<ApiTable />}></Route>
                    <Route path="new" element={<ApiForm />}></Route>
                    <Route path=":id/edit" element={<ApiForm />}></Route>
                  </Route>
                  <Route path="embedding" element={<Outlet />}>
                    <Route index element={<EmbeddingTable />}></Route>
                    <Route path="new" element={<EmbeddingForm />}></Route>
                    <Route path=":id/edit" element={<EmbeddingForm />}></Route>
                  </Route>
                  <Route path="microapp" element={<Outlet />}>
                    <Route index element={<MicroAppTable />}></Route>
                    <Route path="new" element={<MicroAppForm />}></Route>
                    <Route path=":id/edit" element={<MicroAppForm />}></Route>
                  </Route>
                  <Route path="/guardrails" element={<Guardrails />}></Route>
                  <Route path="/cypher" element={<Cyphers />}></Route>
                </Routes>
              </Suspense>

              {/* TODO: move this code to workflow component. implemented routing using react router */}
              {/* <workflowBackContext.Provider value={setSelectedWorkflow}>
                {selectedTabKey === '1' ? (
                  selectedUiCard.length > 0 ? (
                    <formContext.Provider value={selectedUiCard}>
                      <UiCardForm sendBack={setSelectedUiCard} />
                    </formContext.Provider>
                  ) : (
                    <UiCardTable getSelectedUiCard={setSelectedUiCard} />
                  )
                ) : selectedTabKey === '2' ? (
                  selectedWorkflow.length > 0 ? (
                    <formContext.Provider value={selectedWorkflow}>
                      <ReactWorkflow />
                    </formContext.Provider>
                  ) : (
                    <WorkflowTable getSelectedWorkflow={getSelectedWorkflow} />
                  )
                ) : selectedTabKey === '3' ? (
                  <AgentTable />
                ) : selectedTabKey === '4' ? (
                  selectedFunction.length > 0 ? (
                    <formContext.Provider value={selectedFunction}>
                      <FunctionForm sendBack={setSelectedFunction}></FunctionForm>
                    </formContext.Provider>
                  ) : (
                    <FunctionTable getSelectedFunction={setSelectedFunction} />
                  )
                ) : selectedTabKey === '5' ? (
                  selectedApi.length > 0 ? (
                    <formContext.Provider value={selectedApi}>
                      <ApiForm sendBack={setSelectedApi}></ApiForm>
                    </formContext.Provider>
                  ) : (
                    <ApiTable getSelectedApi={setSelectedApi} />
                  )
                ) : selectedTabKey === '6' ? (
                  selectedApi.length > 0 ? (
                    <formContext.Provider value={selectedApi}>
                      <ApiForm sendBack={setSelectedApi}></ApiForm>
                    </formContext.Provider>
                  ) : (
                    <FunctionTable getSelectedFunction={setSelectedApi} />
                  )
                ) : selectedTabKey === '7' ? (
                  selectedApi.length > 0 ? (
                    <formContext.Provider value={selectedApi}>
                      <ApiForm sendBack={setSelectedApi}></ApiForm>
                    </formContext.Provider>
                  ) : (
                    <FunctionTable getSelectedFunction={setSelectedApi} />
                  )
                ) : selectedTabKey === '8' ? (
                  selectedApi.length > 0 ? (
                    <formContext.Provider value={selectedApi}>
                      <ApiForm sendBack={setSelectedApi}></ApiForm>
                    </formContext.Provider>
                  ) : (
                    <FunctionTable getSelectedFunction={setSelectedApi} />
                  )
                ) : selectedTabKey === '9' ? (
                  selectedApi.length > 0 ? (
                    <formContext.Provider value={selectedApi}>
                      <ApiForm sendBack={setSelectedApi}></ApiForm>
                    </formContext.Provider>
                  ) : (
                    <FunctionTable getSelectedFunction={setSelectedApi} />
                  )
                ) : null}
              </workflowBackContext.Provider> */}
            </div>
          </Content>
        </Layout>
      </Layout>
      <FloatingButton />
    </div>
  );
}

export default App;