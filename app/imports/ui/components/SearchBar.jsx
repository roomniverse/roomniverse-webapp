import React from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Search } from 'semantic-ui-react';

const initState = {
  loading: false,
  results: [],
  value: '',
};
const source = _.times(4, () => ({
  image: Meteor.users.avatar,
  title: Meteor.users.username,
}));

class SearchBar extends React.Component {
  reducer(state, action) {
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

  render() {
    const [state, dispatch] = React.useReducer(this.reducer, initState);
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

        const re = new RegExp(_.escapeRegExp(data.value), 'i');
        const isMatch = (result) => re.test(result.title);
        dispatch({
          type: 'FINISH_SEARCH',
          results: _.filter(source, isMatch),
        });
      }, 300);
    }, []);

    return (
      <Search
        loading={loading}
        onResultSelect={(e, data) => dispatch({ type: 'UPDATE_SELECTION', selection: data.result.title })}
        onSearchChange={handleSearchChange}
        results={results}
        value={value}
      />
    );
  }
}

export default SearchBar;
