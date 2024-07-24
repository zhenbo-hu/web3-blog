import { HeartFilled } from "@ant-design/icons";
import { Popover } from "antd";
import Paragraph from "antd/es/typography/Paragraph";

export default function BlogFooter() {
  return (
    <div className="footer">
      <hr color="grey" />
      <div className="footer-item">
        <h3>
          Kevin's Web3 Blog&nbsp;|&nbsp;
          <HeartFilled className="heart" />
          &nbsp;
          <Popover
            color="blanchedalmond"
            title="Donation addresses"
            content={
              <ul>
                <li>
                  <div className="li-item">
                    <b>Bitcoin:</b>&nbsp;
                    <Paragraph copyable>
                      3DfJkX1Pi8z3fCS4zWkFt7FBrVub7pEgSB
                    </Paragraph>
                  </div>
                </li>
                <li>
                  <div className="li-item">
                    <b>Ethereum(or other EVM chains):</b>&nbsp;
                    <Paragraph copyable>
                      0x758Cdf3310142c038A676453b541C2EF7D9a61aA
                    </Paragraph>
                  </div>
                </li>
              </ul>
            }
          >
            Donation
          </Popover>
        </h3>
      </div>
    </div>
  );
}
