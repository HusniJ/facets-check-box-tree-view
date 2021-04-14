import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import TreeItem from '@material-ui/lab/TreeItem';
import TreeView from '@material-ui/lab/TreeView';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { CircularProgress, makeStyles, Snackbar, Checkbox, FormControlLabel, Button } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    height: 110,
    flexGrow: 1,
    maxWidth: '100%',
  },
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const App = () => {
  const classes = useStyles();
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('error');
  const [isLoading, setIsLoading] = useState(false);
  const [treeData, setTreeData] = useState({});
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    axios.get("/treedata").then((response) => {
      if (response.data?.categories.length > 0) {
        let treeData = nest(response.data.categories);
        setTreeData({
          name: 'Categories',
          id: 0,
          count: 0,
          children: treeData
        });
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

  // Renders the tree items based on the nodes
  const renderTree = (nodes) => {
    return (
      <TreeItem
        key={nodes.id}
        nodeId={nodes.id}
        label={
          <FormControlLabel
            control={
              <Checkbox
                checked={selected.some(item => item === nodes.id)}
                onChange={event =>
                  getOnChange(event.currentTarget.checked, nodes)
                }
                onClick={e => e.stopPropagation()}
              />
            }
            label={nodes.name}
            key={nodes.id}
          />
        }
      >
        {Array.isArray(nodes.children)
          ? nodes.children.map(node => renderTree(node))
          : null}
      </TreeItem>
    )
  };

  return (
    <div className="App">
      <h1>Categories Tree View</h1>

      <div>
        {isError &&
          <Snackbar open={isError} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error">
              {errorMessage}
            </Alert>
          </Snackbar>}
        {isLoading ?
          <div>
            <CircularProgress />
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
            <TreeView
              className={classes.root}
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
            >
              {renderTree(treeData)}
            </TreeView></div>}
      </div>
    </div>
  );
}

export default App;
