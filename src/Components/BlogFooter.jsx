import { HeartFilled } from "@ant-design/icons";
import { Popover } from "antd";
import Paragraph from "antd/es/typography/Paragraph";
import { DONATION_BITCOIN_ADDRESS, DONATION_ETHEREUM_ADDRESS } from "../config";

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
                    <Paragraph copyable>{DONATION_BITCOIN_ADDRESS}</Paragraph>
                  </div>
                </li>
                <li>
                  <div className="li-item">
                    <b>Ethereum(or other EVM chains):</b>&nbsp;
                    <Paragraph copyable>{DONATION_ETHEREUM_ADDRESS}</Paragraph>
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
