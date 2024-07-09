import React from "react";
import {Link} from 'react-router-dom';

const Products = (props) => {
    return (
      <div>
          <div>
              <table className={"table"}>
                  <thead>
                    <tr>
                        <th scope={"col"}>title</th>
                        <th scope={"col"}>fullPrice</th>
                        <th scope={"col"}>discountPrice</th>
                        <th scope={"col"}>description</th>
                        <th scope={"col"}>descriptionDetails</th>
                        <th scope={"col"}>washingInstructions</th>
                        <th scope={"col"}>clothingCategory</th>
                        <th scope={"col"}>personCategory</th>
                        <th scope={"col"}>image</th>
                        <th scope={"col"}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props.products.map((p) => {
                        const colorOption = props.productColorOptions.find(option => option.product.id === p.id);
                        const optionImage = props.productImages.find(image => image.colorOption.id === colorOption.id)
                        const image = optionImage ? optionImage.imageUrl : 'https://img.freepik.com/premium-vector/no-photo-available-vector-icon-default-image-symbol-picture-coming-soon-web-site-mobile-app_87543-10951.jpg'
                        return (
                            <tr key={p.id}>
                                <td>{p.title}</td>
                                <td>{p.fullPrice}</td>
                                <td>{p.discountPrice}</td>
                                <td>{p.description}</td>
                                <td>{p.descriptionDetails}</td>
                                <td>{p.washingInstructions}</td>
                                <td>{p.clothingCategory}</td>
                                <td>{p.personCategory}</td>
                                <td><img src={image} alt={'img'} style={{ width: '50px', height: '50px' }}/></td>
                                <td>
                                    <Link onClick={() => props.onDetails(p.id)} to={`/product/${p.id}`}>Details</Link>
                                </td>
                            </tr>
                        )
                    })}
                  </tbody>
              </table>
          </div>
      </div>
    );
}
export default Products;