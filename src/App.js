import { useEffect, useState } from 'react';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import { CircularProgress, Snackbar, Button } from '@material-ui/core';
import Tree from './components/TreeView/Tree';
import Grid from './components/Grid/Grid';
import './App.css';

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('error');
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState({});
  const [selected, setSelected] = useState([]);
  const [rawData, setRawData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/treedata").then((response) => {
      if (response.data?.categories.length > 0) {
        response.data.categories.push({
          name: 'Categories',
          id: 0,
          count: 0,
          parent: -1
        })
        let hirarchicalData = nest(response.data.categories);
        setTreeData({
          name: 'Categories',
          id: 0,
          count: 0,
          children: hirarchicalData
        });
        setRawData(response.data.categories);
      }
    }).catch((error) => {
      setIsError(true);
      setErrorMessage('sorry something went wrong');
      console.log(error);
    }).finally(() => {
      setIsLoading(false);
    });

    // Creates the tree structure data
    const nest = (items, id = "0", link = 'parent') =>
      items.filter(item => item[link] === id).map(item => ({ ...item, children: nest(items, item.id) }));

  }, [])

  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setIsError(false);
  };

  // Get All Child Elements (nodes) for a selected parent
  const getAllChild = (nodes) => {
    let array = [];
    if (nodes === null) return [];
    array.push(nodes.id);
    if (Array.isArray(nodes.children)) {
      nodes.children.forEach(node => {
        array = [...array, ...getAllChild(node)];
        array = array.filter((v, i) => array.indexOf(v) === i);
      });
    }
    return array;
  }

  // Get the Node from selected Id
  const getNodeById = (nodes, id) => {
    if (nodes.id === id) {
      return nodes;
    } else if (Array.isArray(nodes.children)) {
      let result = null;
      nodes.children.forEach(node => {
        if (!!getNodeById(node, id)) {
          result = getNodeById(node, id);
        }
      });
      return result;
    }
    return null;
  }

  // Select all the Child from Parent Id
  const getChildById = (node, id) => {
    return getAllChild(getNodeById(node, id));
  }

  // Get the clicked tree node and its childs
  const getOnChange = (checked, nodes) => {
    const allNode = getChildById(treeData, nodes.id);
    let array = checked
      ? [...selected, ...allNode]
      : selected.filter(value => !allNode.includes(value));

    array = array.filter((v, i) => array.indexOf(v) === i);

    setSelected(array);
  }

  return (
    <div className="App">
      <br />
      <h1>Categories Selection</h1>
      <br />
      <div>
        {isError &&
          <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>}
        {
          isLoading ?
            <div className="spinner-div">
              <CircularProgress style={{marginLeft: '50%', marginTop: '10%'}} />
            </div> :
            <div>
              <div className="buttons-div">
                <Button variant="contained" color="secondary" onClick={() => getOnChange(true, treeData)}>
                  Check All
                </Button>
                <Button variant="contained" onClick={() => getOnChange(false, treeData)}>
                  Un-Check All
                </Button>
              </div>
              <br />
              <div className="d-flex">
                <div className="tree-container">
                  <Tree data={[treeData]} getOnChange={getOnChange} selected={selected} />
                </div>
                <div className="grid-container">
                  <Grid data={rawData} selected={selected} />
                </div>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
