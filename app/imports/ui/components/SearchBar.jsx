import React from 'react';
import { filter, times, escapeRegExp } from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Search } from 'semantic-ui-react';

const source = times(5, () => ({
  image: Meteor.users.avatar,
  title: Meteor.users.username,
}));
const initState = {
  loading: false,
  results: [],
  value: '',
};

function reducer(state, action) {
  switch (action.type) {
  case 'CLEAN_QUERY':
    return initState;
  case 'START_SEARCH':
    return { ...state, loading: true, value: action.query };
  case 'FINISH_SEARCH':
    return { ...state, loading: false, value: action.results };
  case 'UPDATE_SELECTION':
    return { ...state, value: action.selection };
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
        onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })}
        onSearchChange={handleSearchChange}
        results={results}
        value={value}
      />
    </div>);
}

export default SearchBar;
