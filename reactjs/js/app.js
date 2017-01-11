var Form = React.createClass({
    controlId: function () {
        var id = [];
        if (localStorage.getItem('myId') == undefined) {
            for (var i = 0; i < model.length; ++i) {
                id.push(model[i].id)
            }

        }  else {
            var saveId = localStorage.getItem('myId').split(',');
            for (var j = 0; j < saveId.length; ++j) {
                id.push(Number(saveId[j]))
            }
        }
        localStorage.removeItem('myId');
        id.sort(sort);
        var thisId = id[id.length -1];
        thisId +=1;
        id.push(thisId);
        localStorage.setItem("myId", id);
        return thisId
    },
    addBookmark: function(e) {
        var name = ReactDOM.findDOMNode(this.refs.name).value,
            url = ReactDOM.findDOMNode(this.refs.url).value,
            desc = ReactDOM.findDOMNode(this.refs.desc).value;


         var item = [{
            id: this.controlId(),
            name: name,
            url: url,
            desc: desc
        }];

        window.ee.emit('List.add', item);
    },
    render: function() {
        return (
            <div className="form form-actions">
                <input type='text' className="form-control" placeholder='name' ref="name" />
                <input type='text' className="form-control" placeholder='url' ref="url" />
                <input type='text' className="form-control" placeholder='desc' ref="desc" />
                <button className="btn btn-default" onClick={this.addBookmark}>Add Bookmark</button>
            </div>
        );
    }
});

window.ee = new EventEmitter();

var Table = React.createClass({
    getInitialState: function() {
        return {
            bookmarks: model
        };
    },
    componentDidMount: function() {
        var self = this;
        window.ee.addListener('List.add', function(item) {
            var newBookmark = self.state.bookmarks.concat(item);
            self.setState({bookmarks: newBookmark});
        });
        window.ee.addListener('DelElem.add', function (item) {
            for (var i = 0, newBookmark = self.state.bookmarks ; i < newBookmark.length; ++i) {
             if (newBookmark[i].id == item) {
                 newBookmark.splice(i, 1);
                 self.setState({bookmarks: newBookmark})
             }
            }
        });

    },
    componentWillUnmount: function() {
        window.ee.removeAllListeners();
    },

    render: function () {
        return (
            <table className="table table-bordered">
                <thead>
                <tr className="headerClass">
                    <td>ID</td>
                    <td>Name</td>
                    <td>Url</td>
                    <td>Description</td>
                    <td>action</td>
                </tr>
                </thead>
                <List data={this.state.bookmarks}/>
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

    delete: function (e) {

        var DelElem = this.props.data.id;
        window.ee.emit('DelElem.add', DelElem);
    },
    render: function() {
        var props = this.props.data,
            id = props.id,
            name = props.name,
            url = props.url,
            desc = props.desc;

        return (
            <tr>
                <td>{id}</td>
                <td>{name}</td>
                <td>{url}</td>
                <td>{desc}</td>
                <td><button className="btn-danger" onClick={this.delete}>delete</button></td>
            </tr>
        )
    }
});


var App = React.createClass({
    render: function() {
        return (
            <div>
                <Form/>
                <Table/>
            </div>
        );
    }
});

ReactDOM.render(
    <App />,
    document.getElementById('home')
);

