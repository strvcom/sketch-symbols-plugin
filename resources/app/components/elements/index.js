import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'react-emotion'
import { fetchTree } from '../../redux/ducks/elements'
import ElementTreeItem from './element-tree-item'
import { Wrapper, TopBar, ButtonFilter } from '../list-element'
import { CompleteElementName } from './element-name'

const mapStateToProps = state => ({
  tree: state.elements.tree,
  loading: state.elements.loading,
})

const Loading = styled.div`
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  text-align: center;
  background: ${props => props.theme.translucideBackground};
  text-shadow: 0px 0px 2px ${props => props.theme.lessLight};
  color: #aaa;
  padding-top: 150px;
`

const Empty = styled.p`
  margin-top: 100px;
  text-align: center;
  color: ${props => props.theme.lightText};
`

const ElementTree = styled.div`
  flex: 1;
  font-size: 13px;
  overflow: auto;
  font-family: Consolas, Menlo, Monaco, 'Lucida Console', monospace;
  height: 50%;
`

const MyPlayground = styled.div`
  flex: 2;
  font-size: 13px;
  overflow: auto;
  font-family: Consolas, Menlo, Monaco, 'Lucida Console', monospace;
  height: 50%;
`

class Elements extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchTree())
  }

  render() {
    const { tree, loading, dispatch } = this.props
    return (
      <Wrapper>
        <TopBar>
          <ButtonFilter
            style={{ paddingTop: 0 }}
            onClick={() => dispatch(fetchTree())}
            title="Refresh the state"
          >
            ⟲
          </ButtonFilter>
        </TopBar>
        {loading && <Loading>Loading...</Loading>}
        {tree.length > 0 ? (
          <React.Fragment>
            <ElementTree>
              {tree.map((e, i) => (
                <ElementTreeItem key={i} element={e} />
              ))}
            </ElementTree>

            <MyPlayground>
              {tree.map(doc => {
                const symbolsPage = doc.children.find(
                  page => page.name === 'Symbols'
                )
                return <CompleteElementName element={symbolsPage} />
              })}
            </MyPlayground>
          </React.Fragment>
        ) : (
          <Empty>No Sketch document found.</Empty>
        )}
      </Wrapper>
    )
  }
}

Elements.propTypes = {
  loading: PropTypes.bool.isRequired,
  tree: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      children: PropTypes.array,
      class: PropTypes.string,
      name: PropTypes.string,
    })
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
}

export default connect(mapStateToProps)(Elements)
