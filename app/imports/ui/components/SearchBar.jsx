import React from 'react';
import { escapeRegExp, filter, times } from 'lodash';
import { Search } from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { Users } from '../../api/user/User';

const source = times(5, () => ({
  image: Users.collection.find().fetch().avatar,
  title: `${Users.collection.find().fetch().firstName} ${Users.collection.find().fetch().lastName}`,
}));

const initState = {
  loading: false,
  results: [],
  value: '',
};

function handleSubmit(state, action) {
  if (action.type === 'CLICK_SELECTION') {
    this.location = '/#/profile';
  } else if (action.type === 'SEARCH') {
    this.loading = true;
    this.location = '/#/search';
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
    return handleSubmit(state, action);
  case 'SEARCH':
    return handleSubmit(state, action);
  default:
    throw new Error();
  }
}

function SearchBar() {
  const [state, dispatch] = React.useReducer(reducer, initState);
  const { loading, results, value } = state || initState;
  const timeoutRef = React.useRef();
  const listenEnter = (e) => {
    if (e.keyCode === 13) {
      dispatch({ type: 'SEARCH', selection: state.value });
    }
  };

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
        onResultSelect={(e, data) => dispatch({ type: 'CLICK_SELECTION', selection: data.result.title })}
        onSearchChange={handleSearchChange}
        onKeyDown={(e) => listenEnter(e)}
        results={results}
        value={value}
      />
    </div>);
}

export default withRouter(SearchBar);
