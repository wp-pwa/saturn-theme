import React from 'react';
import { connect } from 'react-redux';
import { SortableContainer as sortableContainer } from 'react-sortable-hoc';
import MenuCard from './MenuCard';
import * as actions from '../../../../actions';
import * as selectors from '../../../../selectors';
import * as deps from '../../../../deps';
import styles from '../../style.css';

const SortableList = sortableContainer(({ fields }) => (
  <span>
    {fields.map((member, index) => (
      <MenuCard
        key={`item-${index}`}
        member={member}
        remove={() => fields.remove(index)}
        index={index}
      />
    ))}
  </span>
));

class SortableComponentClass extends React.Component {
  constructor(props) {
    super(props);
    this.onSortEnd = this.onSortEnd.bind(this);
  }

  onSortEnd({ oldIndex, newIndex }) {
    this.props.onSortEnd({ oldIndex, newIndex });
    this.props.fields.move(oldIndex, newIndex);
  }

  render() {
    return (
      <SortableList
        fields={this.props.fields}
        onSortEnd={this.onSortEnd}
        onSortStart={this.props.onSortStart}
        useDragHandle
      />
    );
  }
}
SortableComponentClass.propTypes = {
  onSortStart: React.PropTypes.func.isRequired,
  onSortEnd: React.PropTypes.func.isRequired,
  fields: React.PropTypes.shape({
    move: React.PropTypes.func.isRequired,
  }).isRequired,
};

const mapDispatchToProps = dispatch => ({
  onSortStart({ index }) {
    dispatch(actions.menuItemSortStarted({ index }));
  },
  onSortEnd({ oldIndex, newIndex }) {
    dispatch(actions.menuItemSortEnded({ oldIndex, newIndex }));
  },
});

const mapStateToProps = state => ({
  items: selectors.getCurrentMenuItems(state),
});

const SortableComponent = connect(mapStateToProps, mapDispatchToProps)(SortableComponentClass);

const Menu = ({ label, fields, pages, categories }) => (
  <div className={styles.section}>
    <span className={styles.label}>{label}</span>
    <SortableComponent fields={fields} />
    <br />
    <deps.elements.Button
      onClick={() =>
        fields.push({
          type: 'latest',
          label: 'Home',
          url: 'http://www.example.com',
          page: `${pages[0].id}`,
          category: `${categories[0].id}`,
        })}
      outlined
      style={{ margin: '0 0.3em 1em 0' }}
    >
      Add menu element
    </deps.elements.Button>
  </div>
);
Menu.propTypes = {
  label: React.PropTypes.string.isRequired,
  fields: React.PropTypes.shape({}).isRequired,
  pages: React.PropTypes.arrayOf(React.PropTypes.object),
  categories: React.PropTypes.arrayOf(React.PropTypes.object),
};

const mapMenuStateToProps = state => ({
  pages: selectors.getPagesList(state),
  categories: selectors.getCategoriesList(state),
});

export default connect(mapMenuStateToProps)(Menu);
