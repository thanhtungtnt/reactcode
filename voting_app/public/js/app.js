class ProductList extends React.Component {
  constructor(props){
    super(props); //luôn viết dòng lệnh này sau khi tạo hàm constructor

    //khởi tạo state
    this.state = {
      products: [],
    };

    // this.handleProductUpvote = this.handleProductUpvote.bind(this);
  }

  //componentDidMount là một Hàm Lifecicle của React
  componentDidMount(){
    //Set data cho products - nếu gọi thì sẽ là this.state.products
    this.setState({products: Seed.products});
  }
  
  //Hàm Vote - Cách viết Arrow Function [TenHam] = ([Variable(optional)]) => {}
  handleProductUpvote = (productID) => {
    //Tạo const changedProducts map (duyệt) từng sản phẩm
    const changedProducts = this.state.products.map( (product) => {
      //Nếu id của product trong data = productID thì tăng vote lên 1
      //Ngược lại return về product bình thường
      if(product.id == productID){
        //Clone 1 Object product bằng hàm Object.assign()
        return Object.assign({}, product, {
          votes : product.votes + 1
        });
      }else{
        return product;
      }
    });
    //Set lại biến this.state.products
    this.setState({products: changedProducts});
  }

  render() {
    //Sắp xếp product tăng dần
    const products = this.state.products.sort((a, b) => (b.votes - a.votes));

    //Duyệt products
    const productItems = products.map((product) => (
      //Truyền các properties vào <Product />
      <Product 
          key = {'product-'+product.id}
          id = {product.id} 
          title = {product.title}
          description = {product.description}
          url = {product.url}
          votes = {product.votes}
          submitterAvatarUrl = {product.submitterAvatarUrl}
          productImageUrl = {product.productImageUrl}
          onVote = {this.handleProductUpvote}
        />
    ));
    return (
      <div className='ui unstackable items'>
        {productItems}
      </div>
    );
  }
}

//Class định nghĩa <Product />
class Product extends React.Component{
  constructor(props) {
    super(props);

    // this.handleUpVote = this.handleUpVote.bind(this); -- không cần viết hàm này vì đã viết kiểu Arrow Function
  }

  //Hàm gọi Hàm trong key 'onVote' trên ProductList và truyền productID vào hàm chứa trong key 'onVote'
  handleUpVote = () =>{
    this.props.onVote(this.props.id);
  }

  //Tạo giao diện và truyền các phần tử từ props vào 
  render() {
    return (
      <div className='item'>
        <div className='image'>
          <img src={this.props.productImageUrl} />
        </div>
        <div className='middle aligned content'>
        <div className='header'>
            <a onClick={this.handleUpVote}>
              <i className='large caret up icon' />
            </a>
            {this.props.votes}
          </div>
          <div className='description'>
            <a href={this.props.url}>{this.props.title}</a>
            <p>{this.props.description}</p>
          </div>
          <div className='extra'>
            <span>Submitted by:</span>
            <img className='ui avatar image' src={this.props.submitterAvatarUrl}
            />
          </div>
        </div>
      </div>
    )
  }
}

//Render giao diện DOM ảo
ReactDOM.render(
<ProductList />, 
document.getElementById('content'));

