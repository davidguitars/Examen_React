class MyHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lista: []
        };
    }

    componentDidMount() {
        fetch("https://hn.algolia.com/api/v1/search_by_date?query=nodejs")
            .then((data) => data.json())
            .then((result) => {
                this.setState({ lista: result.hits });
            });
    }

    removeItem(index) {
        console.log(index);
        let newArray = this.state.lista;
        newArray.splice(index, 1);
        this.setState({ lista: newArray });
    }

    render() {
        console.log('////////////')
        const listaItem = this.state.lista.map((item, key) => {
            if (item.title || item.story_title) {
                return (
                    <div key={key}
                         className="list-group-item list-group-item-action list-item">
                        <a href={item.story_url ? item.story_url : item.url}
                        target="_blank" className=""> {item.title ? item.title : item.story_title}</a>
                        <i onClick={() => this.removeItem(key)} className="fas fa-trash-alt delete-hover"></i>
                    </div>
          );
        }
      });
      return <div>{listaItem}</div>;
    }
  }

  ReactDOM.render(<MyHome />, document.getElementById("list"));
