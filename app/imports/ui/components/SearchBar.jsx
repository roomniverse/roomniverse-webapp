import React from 'react';
import { escapeRegExp, filter, times } from 'lodash';
import { Search } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Users } from '../../api/user/User';

const source = times(5, () => ({
  image: Users.collection.avatar,
  title: `${Users.collection.firstName} ${Users.collection.lastName}`,
}));
const initState = {
  loading: false,
  results: [],
  value: '',
};

function handleSubmit(state, action) {
  return (action.type === 'CLICK_SELECTION') ? (
    <Link to="/profile"/>
  ) : (
    <Link to="/search" filter={action.value} />
  );
}

function reducer(state, action) {
  switch (action.type) {
  case 'CLEAN_QUERY':
    return initState;
  case 'START_SEARCH':
    return { ...state, loading: true, value: action.query };
  case 'FINISH_SEARCH':
    return { ...state, loading: false, value: action.results };
  case 'CLICK_SELECTION':
    return handleSubmit(state, action);
  case 'UPDATE_SELECTION':
    return { ...state, loading: false, value: action.selection };
    // return handleSubmit(state, action);
  default:
    throw new Error();
  }
}

function SearchBar() {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const { loading, results, value } = state;
  const timeoutRef = React.useRef();
  const handleSearchChange = React.useCallback((e, data) => {
    clearTimeout(timeoutRef.current);
    dispatch({ type: 'START_SEARCH', query: data.value });
    timeoutRef.current = setTimeout(() => {
      if (data.value.length === 0) {
        dispatch({ type: 'CLEAN_QUERY' });
        return;
      }

      const re = new RegExp(escapeRegExp(data.value), 'i');
      const isMatch = (result) => re.test(result.title);
      dispatch({
        type: 'FINISH_SEARCH',
        results: filter(source, isMatch),
      });
    }, 300);
  }, []);

  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  });

  return (
    <div>
      <Search
        loading={loading}
        onMouseDown={(e, data) => dispatch({ type: 'CLICK_SELECTION', selection: data.result.title })}
        onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })}
        onSearchChange={handleSearchChange}
        results={results}
        value={value}
      />
    </div>);
}

export default SearchBar;
