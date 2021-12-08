import React from 'react';
import { escapeRegExp, filter, map, times } from 'lodash';
import { Search } from 'semantic-ui-react';
import { Users } from '../../api/user/User';

const users = Users.collection.find({}).fetch();
const initState = {
  loading: false,
  results: [],
  value: '',
};

function handleSubmit(state, action) {
  if (action.type === 'CLICK_SELECTION') {
    this.location = `/#/profile/${action.selection}`;
  } else
  if (action.type === 'SEARCH') {
    this.location = `/#/search/${action.value}`;
  }
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
    handleSubmit(state, action);
    return initState;
  case 'SEARCH':
    handleSubmit(state, action);
    return initState;
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
      if (e.keyCode === 13) {
        dispatch({ type: 'SEARCH', submit: data.value });
        return;
      }

      const re = new RegExp(escapeRegExp(data.value), 'i');
      const isMatch = (result) => re.test(`${result.firstName} ${result.lastName}`);
      dispatch({
        type: 'FINISH_SEARCH',
        results: map(times(5, filter(users, isMatch)), (entry) => ({
          title: `${entry.firstName} ${entry.lastName}`,
          image: entry.avatar,
          id: entry._id,
        })),
      });
    }, 300);
  }, []);

  React.useEffect(() => () => {
    clearTimeout(timeoutRef.current);
  }, []);

  return (
    <Search
      loading={loading}
      onResultSelect={(e, data) => dispatch({ type: 'CLICK_SELECTION', selection: data.result.id })}
      onSearchChange={handleSearchChange}
      onKeyDown={handleSearchChange}
      results={results}
      value={value}
      fluid
    />
  );
}

export default SearchBar;
