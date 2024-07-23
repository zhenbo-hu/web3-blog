import Arweave from "arweave";
import { arweaveGateway } from "../config";

const arweave = Arweave.init({
  host: "127.0.0.1",
  port: 1984,
  protocol: "http",
});

export const storeArweave = async function (content, tags) {
  let tx = await arweave.createTransaction({
    data: content,
  });

  Object.keys(tags).map((k) => {
    return tx.addTag(k, tags[k]);
  });

  await arweave.transactions.sign(tx); //
  const response = await arweave.transactions.post(tx);

  return { success: response.status === 200, data: tx.id };
};

export const imageToArweave = async function (file) {
  const content = await readImageFile(file);
  const { success, data } = await toArweave(content);
  return { success, data };
};

export const readImageFile = (file) => {
  const reader = new FileReader();
  return new Promise((resolve, reject) => {
    reader.onload = (event) => {
      resolve(event.target.result);
    };
    reader.onerror = (event) => {
      reject(event);
    };

    reader.readAsArrayBuffer(file);
  });
};

export const toArweave = async function (entity) {
  let tx = await arweave.createTransaction({
    data: entity,
  });
  tx.addTag("Content-Type", "image/jpeg");

  await arweave.transactions.sign(tx); //
  const response = await arweave.transactions.post(tx);

  const myurl = arweaveGateway + tx.id;

  return { success: response.status === 200, data: myurl };
};
