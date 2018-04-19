import { connect } from 'react-redux';
import SearchBar from '../components/SearchBar';

const mapStateToProps = state => ({
  results: [
    {
      title: 'Washington St.',
      type: 'plan',
      typeDetail: null,
      color: '#EF4579',
      tags: [
        {
          type: 'time',
          value: 'May 2020',
        },
      ],
    },
    {
      title: '202 Washington St.',
      type: 'permit',
      typeDetail: 'Trench Digging',
      color: '#F26262',
      tags: [
        {
          type: 'time',
          value: '10/30 - 11/14',
        },
        {
          type: 'user',
          value: 'National Grid',
        },
      ],
    },
    {
      title: '202 Washington St.',
      type: 'permit',
      typeDetail: 'Road Opening',
      color: '#45CEEF',
      tags: [
        {
          type: 'time',
          value: '1/3 - 1/13',
        },
        {
          type: 'user',
          value: 'Eversource',
        },
      ],
    },
  ],
});

const mapDispatchToProps = dispatch => ({
  fetchResults: (query) => dispatch(fetchResults(query))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
