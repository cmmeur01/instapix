import React from 'react';
import './../../assets/stylesheets/post_item.css';
import * as heart from './../../assets/images/heart.png';
import * as bubble from './../../assets/images/bubble.png';


const PostItem = ({ post, user }) => {

  if (!user) return null;

  let date = '';
  if (post) {
    let months = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ]
    let month = parseInt(post.date.slice(5,7));
    let day = post.date.slice(8, 10);
    let year = post.date.slice(0, 4);
    date = months[month - 1] + ' ' + day + ', ' + year;
  }
  // debugger;
  return (
    <div className='post-item-container'>
      <article className='post-item'>
        <header className='post-header'>
          <div className='post-user-image'>
            <img src={user.image_url} alt={user.username} />
          </div>
          <div className='post-user-username'>
            <h4>{user.username}</h4>
          </div>
        </header>
        <div className='post-image'>
          <img src={post.imgUrl} alt={user.username} />
        </div>
        <footer>
          <section className="icons-div">
            <div className="like-icon">
              <button className="icon-btn"><img className="img-heart-icon" src={ heart } alt="" /></button>
            </div>
            <div className="comment-icon">
              <button className="icon-btn"><img className="icon-comment img-icon" src={ bubble } alt="" /></button>
            </div>
            <div className="share-icon">
              <img className="img-icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAh1BMVEX///8AAADz8/P09PT+/v4EBAT19fX9/f38/Pz7+/v29vb6+vr39/f4+Pj5+fmUlJTPz885OTnd3d1RUVGOjo7Gxsaurq4ZGRne3t7X19d9fX08PDzR0dGXl5erq6txcXERERG7u7tdXV1FRUReXl4oKChqamrp6elVVVUnJycvLy5KSkqhoaE3r7hsAAATUklEQVR4nNVdC3ubOg+GhHC/JOllTda027qz7jvb//99H2ALsCQDtiHJ4XnOKe1krNdIvLIljOeJIwjIiac7WV922cu1R5yIX4M47k7Ev0RJdxLpZIkIJ+tpZEHERNZETXFkhfhzUJbiz1GZSbkiESdJEVvIlpOycDkPRDrZGGTtuobrtkeRij8HeSr+HKW5uESSlrL/NCOyspe08LBsArJSI7hcDLJZfzkpS7rmZEnXVM0EybZXLbbiz0G4Fb3E21C0zDa5bLCRl0i3suV2KxXZpPLiIJtvpEahlI1ANullC1W26zqCrhOmaws1W5vNJO5a6emWGyy7CT1Vtge4MQGoky1Alna9xV1TNVvjjaXl9sO4WRRg0CsdagFqB4MCDPuu9WrKrtMigPvYKLIhAFPUMuwBgol2SlvcwbQHiLpOSNf92PayngZgP7bt5SRrDO+K+R20AsiYKAWoNdFpNbuuUcsZxv0f8UGQlb1Mm+jCPsiY6AwfpGpqfVAFqFf6vnxwjppobGUvLjTh5IMjnDlqorPVjJofQb4ODwZzfNCAJmYBRCYaZVET5KWr+KCriRKAFj4Y5y3jl5PP3wV98OQfR0O1OWM7pWbXdRw2/xLIech1aOLk+/5reSWaiIWIZPzrhGpHvzlOEqBFqGZkotA1tNQNzYIm+lLD2+18/8VbM1TDasJvV6CJUwtw197FtUK1gWw6BHg1HxQAa4jJxgKgjZqB0suqodpxABB8cbVQrVOzZfwovQZNKADrH0dF6YVDtc5Ek6yZIJb5FWb0JwWg8MUVaQJk80apODO/98ah2pEAbO7iwjN6+iwMG+0CWH0bsxNkosZ3kAPYPG5MaELvSTqa6KJE7dCs5IMAEB43bjRBQzWy+DcNcHkfhJPTTIBObCZ/W5EmXrQAm+hmLZrAAE2M2ypU4wHWj5ty0getaKJTMxAaXSVU4wDWMw3oetFQrVMzbv4hTm/ig/Ln7jgBcMwHJ000a6gwKsr1APJP0f4Pu5YXl5rRE0MrWsZPEtRytVCNB9hAdAnVRmgiD5vLAePfwkThL3tP17UNTdD74A5wzmxCDxDC8IVCNaqm2vLqJipOjh7vg0hpKzbDQ7Pgqtp8gE1045R8GcnTagFeyQfhZPdaLhqqdWoGQqPb+WBP/cIXFwrVOjXb7GiX5r+RD8K/HMeVNgnVOjXbpdmoyGBorhSqcQDlCpxdKYEWYN6WnECpze18cLACZ5F8GVMzbDNP0eIAzU2UrMC5hGpETfjthj6IqH9GnnYOTagA78BEuxW4hUI1d4AL0QRdgVuGJrQAb2ei/QocUtpp4QHVtd2KJoay8LiZtfg36YNBJurazO/9agBhBW6hNKZa13Z7H+xX4JbxwShU69rW9MG3PwTXn7eWH9jBOJU2M3qqZluHytS1TQ6NsYk+ewdyK79Gb74G4GAFbonFP2OABsmXDmBy8LFlHjbes86cJfW7mag1QHMTfa5VPPgIoH+oO3jmATYnx6XWp+1bGphofd0DArjzvzZ299z5IrHiY+ASqi1+B8cBJluJcCjSIvT++hqAYytwBmqiurY1aOK5zRpkBwRQIAzC+E0DcCeKUhzztFDXtiJNPAvZFqEqUiMMtptAPG54qnzhlDYxUahrW9cHW9kGISLEGqG4K8/6oIBdgZsPMFHr2tbywVY2OxCRrxks/AIv0mBn91o6RZTDura1aELKZgzjb6BWrfdF8rSBFTinOYF9y/kAW4RI5LDpx/aZBwjUb0UTGoCrmGh9bBnGF2wnZvTP+nj8tOgdXJwmusHQMH63dN9TP7ncMXOJKEVd28omWk+xtxrG77r2+jCczIlP6D6YqBmLujYL4zYx0Tq+TDDjt2wxTL50YTi5XLcCZ6GmrGuD9/xWA1hoGF9dVXvTX+5k+agQdW1JNtXSzQfbHD1ifL9FGKBVtTd1AjU8efGsHhVKXdtqPtjOEDjGL8i66ID68cnJSk05ObEDaGCiHmJ88fOwSfG6aPTGXU5CtFOzO9b0QUCIZOs5PgJYD/kbDxCo3+r9FTuAJj7YHJsDVto/ZBSgEobjk+M176CRD7bXPWBZyfhk2fC5s0uCtFuBMwGo1rWtZKJeuk0PRLZFSNdFu1k/44yv5gDVurY1aKIFuImB8QeyDUJu4Vc+UQlA8EWj9zjVura1TLSZxErGH8rWCDXJl5EVuBezO1jkbZYbNjWY2fLT+A4mwPiK0l8TbdXnyArcZ2nyHmfYiECWe/bQBGdzgEM+7Bg/3eqSL/oVuLPZi6rycjzAEeN+x/1PAhzw4YDx9ckX3Qrcu7c1f5daA3BsaJKzkQ+2jYEPKePzK9vsCtyZAJzxoqoFwFrps9kdZBh/5x8SfjAC7QrcOTYAmI8DnHxJ+d0IYBBixgc+HEm+kBW4c2QDUNa1md/7s28AcBsWBwRQIuQAykUnvAJnZaKBrGuzGJrk3QDgNlAZfweMP14no6zAWd3BoBB1bYl5yzAUvjgPYKQyfrfmPZUAfXP0QbF7S1fXNuP5q/rr+0wfbJQeMv4OGL+cTIB2iXAjmhjch2Fdm4lxyxrQs+h/lCZkSTO/5j39krL0RTsfhFLV2S0HGwXI29764rSJeuoMuGN8fdVn17XwRTsT7dQ0b9nVcmTnmQC9glnzDkF2NPnyZvuQ4QGO8CC3l0V9F98meBBkdWve0wnQt/fg2iZqsFFAVxCrzXLPSIB6FnTdqQl1beb33uwl5VST5V5r25teTVzXNv381fYy8pLyNiRr3pLxF3yXmlezGO7esuq2Y3yW26lOZo6aSl3butuOqWvekvFN3nyxelQodW0rbzvGM/5ildfjakIvM0I1MLsZPojMmWX8xao+RdfEk4YAV992jKtrK1Sl3UxUr+ZUy74XGxPtB0PH+HZ1MgaPikAZxjnPXzMflNklLeMv7oMbBFDUtaVuJjrjJeVCk+VeiOj1asbK7i2znr+W+8nwWe6FaIKEav19UOra1qEJaXZslttbbZdQtq5t3R1iR+va3GgiJyaKtiKWj9Q1QrWB0kyW+2vnKyv5oFoVtUqo1gMcr2tbOFTDm0nPB2jrg83BZblLGAwkuwwP4js4PwYyCNV6pUttlnvxUA0DDEQv64RqfQK0r2vrb2WLcK1QTVvXtkioxrzDm2nr2tYJ1TofVOvalg7VhvlBPsu9VqjWyyp1bY6h2vj2m2yW277qc66ayu4tZqHabJoY1rWpj9Ov+XYtmsCPCm3LJWhC9sJmuRf2QarmBECLUE3/Hn2mz3IvFarNBLjWZv4c48sM/1o+ONtEF9khVl/XthZNdF2LZaKlaMLTAEy3+VRd28KhWtd1IuraXGhi1n4y0VRd21omWoq6tsy8pem2YzzjLz2jJ2rmbF3bKhuJs4y/8MIvUybH1rWt880XjvHD7QyasAjVaJmc/M2NJnQApSIs47P1D+zYOrEZHpplaQLqZEbq2tYK1SYBLueDzcHUtcks91o0wQN0Sr6M7WWhr2tbJvkyoqbIcrv44Kxtx8JSU9e2tg/CV8mWSL6M7yeT8XVti4dqWE25e0tndrqWpZ0PDvKDfF3bUjN67djKurYIWkLyW3bryfeo65GIUUvjrf/YurbC0USxmjI9Maz6bP4Cu7d0z990//HQHn8e5PHn4xm1NN4hls9yu4Vq3tsfVc2Hh48Tpya0hF6KvU+Oigc4f9sxNsttU/U5fFRUVNG9HmDfi7dXFGlPLkOlbXaIzZksd6oCnBeqDYm+IhUsNUItwIFf7QnABqHTDrEjdW0ONFERgP6+nDLRpuWeDs3Fiib6BOh0XZtNqFYR3/afcqSmYPxc5cE9HZpL5LZLs7auzYkHK+Lb/lOgdi3q2vqvkole9nRoqtKWJjzxxNXUtTklX7xH7Ns7uWtPD1D5KlnXck+H5tGjSmsA8uWU43VtdqFa+YgBSoS9miLLLT8U0vUSPNGhuSCAxjvEcnVtWeoWqkUVBigQ4hIdUteWP9GhucwHyJdy8YzvmHypCMAGIX1UiJZ9mJ7t6dBcvHkzem29KMv4utXqubOJigCsEQ5zREOAw6HhGX+eD+rKKUNtXZvDjJ5lfKIm0wvL+JY00cnqGN8l+cIxfoHVDJiWLOM7fZ5vtK7NPvnCMj6KR2RdmzpVZhi/Stw289fVtbnN6DnG99Su+bo2hvEfM5MZvfKsFsmXibo2qxm9nvH7qk/xVTJc1/ZEh6aSI2K9mT+/e4vbqlqmY/xeTbl7C2oZaxnfYTP/PkPaHYcydFt08gjji70WB54kL4daahnf5Zsv2ce3L+rx7YMobbqqhhnfbxFqvmk1aBkTxhczYLcPPn9+fm7aA35uPrUAZyVfCsL4fouQehIGWBDG91uEjt982UKGCyYGYeqcfKkIQP+V7rbEtNzTobnYfp5v1QRoRQD6+xwDDIRGysLvng7NZWQreKcdYp2SL0PGl4+vpxIBxF8la3vZ06GpMluacAA4mXypSM0qMH7XdabUtcGa+J4OzWPi4oNOdTL65EvUMz6cSMbvqz6VurZOaeDDwdBUSGmrb74snXzJKgxQIuzHFn2VTPaSPdGhuWgAuu0Q65h86Rh/oO9eVRPyE2rLnvH7lhcdQHMTdSunVMa2IgAbhMzWU3ho9nRoLoYA1zfRxngqArBGqAU4aLmnQ3OxCtXWq5MR3lERgP5rMHkHE2B8peXFLlRbq5xSdl0RgDXjj9e1iZZ7OjQ14y9ME0vUyVSkgsV/yuByw7q27qtksuWeDk2V3U2oNqiyAD7s+RsYX1vXJlru6dA8RgTgrUK1QRECZvz656sqK+vaUAqbMv4OGP8eQrW+66TCACXjD+ra2nWoCLUsMOMDH64WqlnVyWy3iPFhzZuqiVvmezo0FwXgLUO1ofFUBGCDMMdq0qHZ06G5aHtxB2hVJ9N2XRGANUJtZeKg5Ssdmup+QrVB148EoH9Kpky0sZMTHZrz/YRqg67PdGH3lGI1RV2bun3DJx2an9490QSM7Q+6sPuJKligrk1tWdKhGdvT6cqhWt91SfNZ/gbJql8lg2EsdrTlC7RceUZvALDdKVZRc+d/S1Q1U/WrZF0vH7jlzn/mlb6dD3px+Zeq+YDU1HyVLDrjljv/N+plbR+cnshsyweq5ll0jR4VuGUodoBFGbaXOwnVOjWLIwXo//UYT5K9DO3kSAH6v5aeLjmZaJN8+cnch6MWoKr09n80R+o/FfcRqoGaTLWB/09Ku5a9oDKSX5Qv/H9zbjBsAc5NvvAAm83D/tUYGr7b7ewiRwC979w3X955gNcO1WQC9J0B6H9PsInCV8mQncSfhGlkcHoPNNEmQB85gP5niD0Jf5UMlu7lftY4fVF56e1DtVgP8D3Ci3/qV8mGmcUTB7C2cxkU3ZQmah9kTbRZSsSD0WoHdW1q+uyDA7jz/32dCXCh5AvHg96ee8jUx4eHAQ6rorDST8oixuDk57FJ34LS1/ZBryyPHA/6/rC2FHkSAETpswftl2x//32Rc0t4vyGABAiksbwMptcZsC78S9TJJli2nJQtj3+ZUE0C/K2OLQJIsvsxTUB184x6MvXj/FhVj/V/7QEn5A8jJ7NklT88nn+Q6dIAoPjUDjXRQOCmKezhZtZapDc6GIAy6KYAW8aPUi6FnX3zxwCyvdjLciImsmJmSE00UeraUPLl6cZKGwFky589+VWytnyPAmxo9ZZ30OxyFWui6lfJaPqs/L2w0usB/OnxEeWwro1JgIbMJ4wW0mjhwVBKVZnNpHmADdtuvtxMaRPZL1t+Vjd+B8VU+fPLf8AHv3yOTlt1JirDrw15j/7u7uDX7aiJtn8fWdrKNz+uDtBsMH5qfFCaKK5ro7kJmUu+2zuooQmlrq37Kpku+bKvo5u7vIO+/00SvW7hQf0qmT5Hn/fflLknmvD9Mx+q9bM6sXtLjADSWWcYnH7fHcB6GqeZTdDNEUdNFFruP3zOVm8H8GPPqelx83Jsorrky4mx1ZsBfJcfe5yz+MebKDXuLPXC77/+5/fH9QGK459f3z+jQKPmXIDahd/w+Pf855t/q+Pbw/nvMfWSUJdCoT4YiD/PL0LIyuYN3M3x9PS0b47XPTmRP/sTKlKfvLIiI7Kn0+cmmVCT3kG1rs2kTqaAqK+A+DaXV4lk0ryefgZINpeyQS6vEqewqEVlSySbwHVNqj7Vr5LdTZ2MN/oG0pia2ETzQq1ru5c6GW7xL5/2JOY+oLq2u6mTsX2Pk6o5yJHeVZ2My0tyjJpTvVy/TsbqPU7uozEqwJu9+WL2kDH3JNLy5glQbmwdqj7Zurar0MQIQM3y7UhEyagpuw7wV8nuoE7GykS1e0yqdW3LAHSlCf0dtGAz/qtk137zZT2aiHR1bf8RmtCGapqioaUB2oRq+qeoU8AlWsLWGHEIs6QQ3iyFTQZzmJTBW9gDWVitCxO4nDTR7o1tkC1BNmdkPSlbgCzuOqVdUzVR16JlUcg5M8xZEpizZDnk0ItoWjYGEdkLyMa9LFyul0WXi2nX+eyuvQKrKX5LYK8oqBqIMtkghpNE1hwEGZaNe1kpksiM5IhsdznoOpjRtZWaUf//wUkQBeQEiZjIciKBweVMZImawf8BPbkqef1z/WoAAAAASUVORK5CYII=" alt="share" />
            </div>
          </section>
          <section>
            <h4>{post.likes.length} likes</h4>
          </section>
          <div className='post-caption'>
            <span className='post-user-username'>{user.username}</span>
            <span>
              {post.description}
            </span>
          </div>
          <div>
            <p>user comments</p>
          </div>
          <div className='post-item-date'>
            <h4>{date}</h4>
          </div>
        </footer>
        <section>
          <h4>comment box</h4>
        </section>
      </article>
    </div>
  )
}

export default PostItem;