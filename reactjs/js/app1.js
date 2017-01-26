/*header*/
var Header = React.createClass({
    render: function () {
        return (
            <div>
                <div className="page-header">
                    <h1>React JS bookmarks</h1>
                </div>
                <Menu/>
            </div>
        )
    }
});
var Menu = React.createClass({
    render: function () {
        return (
            <ul className="nav nav-tabs">
                <li><IndexLink to="/" activeClassName="active">Home</IndexLink></li>
                <li><Link to="/add" activeClassName="active">Add Bookmark</Link></li>
                <li><Link to="/list" activeClassName="active">List</Link></li>
            </ul>
        )
    }
});

var Home = React.createClass({
    render: function () {
        return (
            <div className="home">Welcome to homepage!</div>
        )
    }
});


/*form*/
var Form = React.createClass({
    addBookmark: function(e) {
        var name = ReactDOM.findDOMNode(this.refs.name).value,
            url = ReactDOM.findDOMNode(this.refs.url).value,
            desc = ReactDOM.findDOMNode(this.refs.desc).value;

        var item = [{
            id: parseInt(window.last) + 1,
            name: name,
            url: url,
            desc: desc
        }];

        window.ee.emit('Bookmark.add', item);
    },
    render: function() {
        return (
            <div className="form-group">
                <input type='text' className="form-control" placeholder='name' ref="name"/>
                <input type='text' className="form-control" placeholder='url' ref="url" />
                <input type='text' className="form-control" placeholder='desc' ref="desc" />
                <button className="btn btn-primary" onClick={this.addBookmark}>Add Bookmark</button>
            </div>
        );
    }
});

/*table*/
window.ee = new EventEmitter();

var Table = React.createClass({
    getInitialState: function() {
        return {
            bookmarks: model
        };
    },
    componentDidMount: function() {
        var self = this;
        window.ee.addListener('Bookmark.add', function(item) {
            var newBookmark = self.state.bookmarks.concat(item);
            self.setState({bookmarks: newBookmark});
            /**/
            var last = newBookmark[newBookmark.length - 1].id;
            window.last = last;
        });

        window.ee.addListener('Bookmark.delete', function(id) {
            for(var i in self.state.bookmarks) {
                if (self.state.bookmarks[i].id == id) {
                    self.state.bookmarks.splice(i, 1);
                }
            }
            self.setState({bookmarks: self.state.bookmarks});
            /**/
            var last = self.state.bookmarks[self.state.bookmarks.length - 1].id;
            window.last = last;
        });
        /**/
        var last = self.state.bookmarks[self.state.bookmarks.length - 1].id;
        window.last = last;
    },
    componentWillUnmount: function() {
        window.ee.removeListener('Bookmark.add');
        window.ee.removeListener('Bookmark.delete');
    },
    render: function () {
        return (
            <table className="table">
                <thead>
                <tr className="headerClass">
                    <td>ID</td>
                    <td>Name</td>
                    <td>Url</td>
                    <td>Description</td>
                    <td>Action</td>
                </tr>
                </thead>
                <List data={this.state.bookmarks} />
            </table>
        )
    }
});

var List = React.createClass({
    propTypes: {
        data: React.PropTypes.array.isRequired
    },
    render: function() {
        var data = this.props.data;
        var row = data.map(function(item, index) {
            return (
                <Bookmark key={index} data={item} />
            )
        });

        return (
            <tbody>
            {row}
            </tbody>
        );
    }
});

var Bookmark = React.createClass({
    propTypes: {
        data: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            url: React.PropTypes.string.isRequired,
            desc: React.PropTypes.string.isRequired
        })
    },
    deleteBookmark: function(e) {
        window.ee.emit('Bookmark.delete', this.props.data.id);
    },
    render: function() {
        var id = this.props.data.id,
            name = this.props.data.name,
            url = this.props.data.url,
            desc = this.props.data.desc;

        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{url}</td>
                <td>{desc}</td>
                <td><button className="btn btn-danger" onClick={this.deleteBookmark}>Delete</button></td>
            </tr>
        )
    }
});

/*app*/
var App = React.createClass({
    render: function() {
        return (
            <div>
                <Header/>
                {this.props.children}
            </div>
        );
    }
});

var {
    Router,
    Route,
    IndexRoute,
    Link,
    IndexLink
} = ReactRouter;

ReactDOM.render(
    <Router>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="add" component={Form}/>
            <Route path="list" component={Table}/>
        </Route>
    </Router>,
    document.getElementById('home')
);