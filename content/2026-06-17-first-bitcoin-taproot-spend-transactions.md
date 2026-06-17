---
title: "The first Bitcoin Taproot spend transactions"
description: "The story behind block 709,635: how a 2017 SegWit message inspired me, a few Brazilians on a Discord call the night Taproot activated, and a full breakdown of all 16 P2TR spends in the block that carried the very first ones."
date: 2026-06-17
---

# Once upon a time...

Back in 2017, when [SegWit](https://en.bitcoin.it/wiki/Segregated_Witness) activated, an OG Brazilian bitcoiner named Narcelio pulled off something I thought was the coolest thing ever. SegWit became active at block [`481,824`](https://mempool.space/block/481824), and just **10 blocks later**, in block [`481,834`](https://mempool.space/block/481834), he broadcasted a transaction that simply said `OP_RETURN Narcelio was here.`

That transaction is [`738309023e4862493cfdaa85599c57a4508b4660f12d0944984bc8de78541ed8`](https://mempool.space/tx/738309023e4862493cfdaa85599c57a4508b4660f12d0944984bc8de78541ed8). It was a P2SH-wrapped SegWit spend, which was the common flavor of SegWit in 2017.

I was a kid amazed by Bitcoin, and seeing a Brazilian carve his name into the chain right after a major upgrade is exactly the kind of thing that pulls you in deeper. It made the protocol feel alive and reachable. That little message is a big part of why I went down the rabbit hole.

So when Taproot activation started getting close, I knew I wanted to do the same thing.

# Taproot activation

[Taproot](https://learnmeabitcoin.com/technical/upgrades/taproot/) activated at block [`709,632`](https://mempool.space/block/709632) on November 14, 2021. The night of the activation, [0xB10C](https://b10c.me) was running a [live monitoring stream](https://b10c.me/projects/019-taproot-activation-monitoring/) of the whole thing: blocks coming in on one side with pool names and coinbase info, and new Taproot transactions hitting the mempool on the other.

The height itself was fixed, but the *time* it would be reached depends on how fast miners find blocks. Bitcoin aims for one block every 10 minutes, and at that steady pace activation was on track for around 08:19 UTC (roughly 05:00 in Brazil, UTC-3). It came a lot sooner, because the blocks leading into activation were coming faster than target, with bursts where several landed within a minute or two of each other:

| Block | Time (UTC) | Gap from previous |
| --- | --- | --- |
| [`709,618`](https://mempool.space/block/709618) | 02:53:53 | 39s |
| [`709,619`](https://mempool.space/block/709619) | 02:55:11 | 1m18s |
| [`709,620`](https://mempool.space/block/709620) | 02:56:10 | 59s |
| [`709,621`](https://mempool.space/block/709621) | 02:57:55 | 1m45s |
| [`709,622`](https://mempool.space/block/709622) | 03:00:36 | 2m41s |
| [`709,623`](https://mempool.space/block/709623) | 03:03:49 | 3m13s |
| [`709,624`](https://mempool.space/block/709624) | 03:03:46 | [*before its own parent*](https://mempool.space/docs/faq#why-block-timestamps-dont-always-increase) |
| [`709,625`](https://mempool.space/block/709625) | 03:05:29 | 1m43s |

Eight blocks in about twelve minutes, and [`709,624`](https://mempool.space/block/709624) even carries a timestamp slightly *earlier* than the block before it (consensus only requires a block to beat the median of the last 11, not its immediate parent). All that banked time added up: instead of the expected ~08:19 UTC, the activation block [`709,632`](https://mempool.space/block/709632) showed up at **05:15:27 UTC** (02:15 Brazil time), about **3 hours early**.

Here is the fun part: **the activation block ([`709,632`](https://mempool.space/block/709632)) contained zero Taproot spends.** None. We were sitting there refreshing, slightly panicking, wondering if we had all screwed something up. Block after block went by with no P2TR spends. The first ones finally landed **3 blocks after activation**, in block [`709,635`](https://mempool.space/block/709635), mined by Foundry USA.

Technically, P2TR outputs were spendable before activation. 0xB10C has a great writeup on this: [Spending P2TR outputs before activation](https://b10c.me/blog/007-spending-p2tr-pre-activation/). Before the `SCRIPT_VERIFY_TAPROOT` rules were enforced, a P2TR output was effectively anyone-can-spend, and at block [`692,261`](https://mempool.space/block/692261) he worked with F2Pool to mine a transaction ([`b10c007c60e14f9d087e0291d4d0c7869697c6681d979c6639dbd960792b4d41`](https://mempool.space/tx/b10c007c60e14f9d087e0291d4d0c7869697c6681d979c6639dbd960792b4d41)) that swept four P2TR outputs and donated the funds to [brink.dev](https://brink.dev).

# My turn

I had to learn how to build a Taproot address, fund it with a few satoshis on mainnet, then wait and broadcast the spend with my message in an `OP_RETURN`.

My original plan was boring: write `jaonoctus was here`, an obvious homage to Narcelio's 2017 transaction. But then a guy on the [bitcoinheiros Discord](https://discord.bitcoinheiros.com) suggested a much funnier alternative: write `chupanarcel.io` and actually go buy the domain.

`chupanarcel.io` reads as "chupa, Narcelio", which is Brazilian Portuguese for, politely, **"suck it, Narcelio!"**. I loved it. So I bought the domain and wrote that into the chain.

That is [`aba317fc0b85563625389947a6ff532f849d09b1224acc56a6e72ea5231849d4`](https://mempool.space/tx/aba317fc0b85563625389947a6ff532f849d09b1224acc56a6e72ea5231849d4), in block [`709,635`](https://mempool.space/block/709635), one of the very first Taproot transactions ever confirmed.

The best part: this time, Narcelio was right there in a Discord call with me while it happened. He landed his own P2TR spend in the same block, [`de1dd38997b0e27b7b1d2db376c1438e24d10b2502e423786dccc83510f805d0`](https://mempool.space/tx/de1dd38997b0e27b7b1d2db376c1438e24d10b2502e423786dccc83510f805d0), with the `OP_RETURN Narcelio is still here` 🧡. And I was not the only one with him. Another Brazilian dev on the call, Otto, landed his too, [`bbc2e707dbc68db35dbada9be9d9182e546ee9302dc0a5cdd1a8dc3390483620`](https://mempool.space/tx/bbc2e707dbc68db35dbada9be9d9182e546ee9302dc0a5cdd1a8dc3390483620), with the `OP_RETURN otto taprooted here`. Brazil mafia. 🇧🇷

We later told the whole story in an interview (in Portuguese) on the [Bitcoinheiros](https://youtu.be/yf7wV7lFG9A) YouTube channel.

# All 16 P2TR spends in block [`709,635`](https://mempool.space/block/709635)

A quick refresher on how to read a Taproot witness:

- **Key path spend:** the witness is a single item, a [Schnorr](https://learnmeabitcoin.com/technical/cryptography/schnorr/) signature (64 bytes, or 65 if an explicit sighash byte is appended). Clean and indistinguishable from any other key-path spend.
- **Script path spend:** the witness ends with a *control block* (it starts with `0xc0` or `0xc1`), the item before it is the revealed *tapscript* leaf, and anything before that is the input to that script (usually signatures).

There are **10 key-path spends and 6 script-path spends** (counting transactions; tx #2 actually mixes both in its two inputs). Here is the actual witness data for each one, with script-path leaves decoded.

### 1. [`33e794d097969002ee05d336686fc03c9e15a597c1b9827669460fac98799036`](https://mempool.space/tx/33e794d097969002ee05d336686fc03c9e15a597c1b9827669460fac98799036)

**Key path.**

```
witness:
  a60c383f71bac0ec919b1d7dbc3eb72dd56e7aa99583615564f9f99b8ae4e837
  b758773a5b2e4c51348854c8389f008e05029db7f464a5ff2e01d5e6e626174a
```

A single 64-byte Schnorr signature.

`OP_RETURN I like Schnorr sigs and I cannot lie. @bitbug42`.

### 2. [`37777defed8717c581b4c0509329550e344bdc14ac38f71fc050096887e535c8`](https://mempool.space/tx/37777defed8717c581b4c0509329550e344bdc14ac38f71fc050096887e535c8)

**Mixed key path + script path (Andrew Chow).**

This one is widely referenced as the first Taproot transaction. It has two inputs:

```
input 0 (key path):
  134896c42cd95680b048845847c8054756861ffab7d4abab72f6508d67d1ec0c
  590287ec2161dd7884983286e1cd56ce65c08a24ee0476ede92678a93b1b180c01

input 1 (script path):
  <sig> 7b5d614a4610bf9196775791fcc589597ca066dcd10048e004cd4c7341bb4bb90cee4705192f3f7db524e8067a5222c7f09baf29ef6b805b8327ecd1e5ab83ca
  <leaf> 20f5b059b9a72298ccbefff59d9b943f7e0fc91d8a3b944a95e7b6390cc99eb5f4ac
  <control block> c0d9dfdf0fe3c83e9870095d67fff59a8056dad28c6dfb944bb71cf64b90ace9a7776b22a1185fb2dc9524f6b178e2693189bf01655d7f38f043923668dc5af45b
```

The revealed leaf is a single-key script:

```
OP_PUSHBYTES_32 f5b059b9a72298ccbefff59d9b943f7e0fc91d8a3b944a95e7b6390cc99eb5f4
OP_CHECKSIG
```

### 3. [`83c8e0289fecf93b5a284705396f5a652d9886cbd26236b0d647655ad8a37d82`](https://mempool.space/tx/83c8e0289fecf93b5a284705396f5a652d9886cbd26236b0d647655ad8a37d82)

**Key path, 4 inputs (Pieter Wuille).**

Four inputs, each a single Schnorr signature (key path). The funding addresses are vanity addresses with `tapr00t`, `tapr00tear`, `tapr00t`, and `partytaptap` baked in. There is also a hidden message in the input amounts: they are funded with **0.0340**, **0.0341**, **0.0342**, and **0.00709632** BTC, encoding the three Taproot BIPs ([340](https://bips.dev/340/), [341](https://bips.dev/341/), [342](https://bips.dev/342/)) and the activation height ([`709,632`](https://mempool.space/block/709632)). No `OP_RETURN`.

### 4. [`905ecdf95a84804b192f4dc221cfed4d77959b81ed66013a7e41a6e61e7ed530`](https://mempool.space/tx/905ecdf95a84804b192f4dc221cfed4d77959b81ed66013a7e41a6e61e7ed530)

**Script path, 2-of-2 multisig (BitGo).**

```
witness:
  <sig A> 23b1d4ff27b16af4b0fcb9672df671701a1a7f5a6bb7352b051f461edbc614aa6068b3e5313a174f90f3d95dc4e06f69bebd9cf5a3098fde034b01e69e8e788901
  <sig B> 0fd4a0d3f36a1f1074cb15838a48f572dc18d412d0f0f0fc1eeda9fa4820c942abb77e4d1a3c2b99ccf4ad29d9189e6e04a017fe611748464449f681bc38cf39
  <leaf>  20febe583fa77e49089f89b78fa8c116710715d6e40cc5f5a075ef1681550dd3c4ad20d0fa46cb883e940ac3dc5421f05b03859972639f51ed2eccbf3dc5a62e2e1b15ac
  <control block> c02e44c9e47eaeb4bb313adecd11012dfad435cd72ce71f525329f24d75c5b9432774e148e9209baf3f1656a46986d5f38ddf4e20912c6ac28f48d6bf747469fb1
```

Decoded leaf, a 2-of-2 multisig (both keys must sign, chained with `OP_CHECKSIGVERIFY` then `OP_CHECKSIG`):

```
OP_PUSHBYTES_32 febe583fa77e49089f89b78fa8c116710715d6e40cc5f5a075ef1681550dd3c4
OP_CHECKSIGVERIFY
OP_PUSHBYTES_32 d0fa46cb883e940ac3dc5421f05b03859972639f51ed2eccbf3dc5a62e2e1b15
OP_CHECKSIG
```

`OP_RETURN Thx Satoshi! ∞/21mil First Taproot multisig spend -BitGo`.

### 5. [`aba317fc0b85563625389947a6ff532f849d09b1224acc56a6e72ea5231849d4`](https://mempool.space/tx/aba317fc0b85563625389947a6ff532f849d09b1224acc56a6e72ea5231849d4)

**Script path (mine).**

```
witness:
  <sig>   b0c92a3cd544a9582db87a3833845a4370c866431b49a89fe892751d9fe3278595a036eae391031e6ded1eae8891003bf3f6b42dde3fbfc15f2dd256db7a3a2a01
  <leaf>  2007d134f9d456df72b43c6af825252a38d28090b0bbe1991b7f5d7767c244ebdeac
  <control block> c072c0db9c5b32137dc96839e1816cd529649d4c7be47bf9422a3e7aa5cd0380a6798a376d38cdfd32fa2ac8a6dad0a370d16c44fe07464a8aa18c09c74e74f95f
```

Decoded leaf:

```
OP_PUSHBYTES_32 07d134f9d456df72b43c6af825252a38d28090b0bbe1991b7f5d7767c244ebde
OP_CHECKSIG
```

`OP_RETURN chupanarcel.io`.

### 6. [`de1dd38997b0e27b7b1d2db376c1438e24d10b2502e423786dccc83510f805d0`](https://mempool.space/tx/de1dd38997b0e27b7b1d2db376c1438e24d10b2502e423786dccc83510f805d0)

**Key path (Narcelio).**

```
witness:
  8a77f0f102bd664cc67cb47a21739d96081c7ab792c977a121fb6d63f66751b3
  f87ad6840eb3d6313ad440ccaf347f6b7ece1aa5ca3c2af58e8f331a76fcae2501
```

A single 65-byte Schnorr signature (it carries an explicit sighash byte).

`OP_RETURN Narcelio is still here`.

### 7. [`bbc2e707dbc68db35dbada9be9d9182e546ee9302dc0a5cdd1a8dc3390483620`](https://mempool.space/tx/bbc2e707dbc68db35dbada9be9d9182e546ee9302dc0a5cdd1a8dc3390483620)

**Key path (Otto).**

```
witness:
  72b05875342250c5117cceaddcceb3d166f3c44b98943a0423d9ee4e8f494c1e
  c8d62a7ebc290f8b9406ee4049b3fa41b407649dd30c3d0acca64963fbe251e701
```

Single 65-byte Schnorr signature.

`OP_RETURN otto taprooted here`.

### 8. [`2eb8dbaa346d4be4e82fe444c2f0be00654d8cfd8c4a9a61b11aeaab8c00b272`](https://mempool.space/tx/2eb8dbaa346d4be4e82fe444c2f0be00654d8cfd8c4a9a61b11aeaab8c00b272)

**Script path (Bitcoin Dev Kit, 2 inputs).**

Both inputs reveal the same leaf and use the same control block:

```
witness (both inputs share the same leaf and control block, each with its own signature):
  <sig, input 0> 0adf90fd381d4a13c3e73740b337b230701189ed94abcb4030781635f035e6d3b50b8506470a68292a2bc74745b7a5732a28254b5f766f09e495929ec308090b01
  <sig, input 1> 4636070d21adc8280735383102f7a0f5978cea257777a23934dd3b458b79bf388aca218e39e23533a059da173e402c4fc5e3375e1f839efb22e9a5c2a815b07301
  <empty>
  <leaf> 20c13e6d193f5d04506723bd67abcc5d31b610395c445ac6744cb0a1846b3aabaeac20b0e2e48ad7c3d776cf6f2395c504dc19551268ea7429496726c5d5bf72f9333cba519c
  <control block> c00000000000000000000000000000000000000000000000000000000000000001
```

Decoded leaf, a 1-of-2 using `OP_CHECKSIGADD`, the new opcode tapscript introduced (`OP_CHECKMULTISIG` is disabled under Taproot, so multisig is rebuilt from `OP_CHECKSIG` and `OP_CHECKSIGADD`):

```
OP_PUSHBYTES_32 c13e6d193f5d04506723bd67abcc5d31b610395c445ac6744cb0a1846b3aabae
OP_CHECKSIG
OP_PUSHBYTES_32 b0e2e48ad7c3d776cf6f2395c504dc19551268ea7429496726c5d5bf72f9333c
OP_CHECKSIGADD
OP_1
OP_NUMEQUAL
```

Notice the control block's internal key is `0x0000…0001`, a publicly known key. That is a close cousin of the [NUMS keys I wrote about earlier](/2026-05-29-secp256k1-nums-public-keys): a key chosen so nobody is meant to use the key path.

`OP_RETURN gm taproot 🥕 https://bitcoindevkit.org`.

### 9. [`a484bf1f3c5be1239bde94c94a58d1d02ebe0bf9a363401db27cd517e4566f05`](https://mempool.space/tx/a484bf1f3c5be1239bde94c94a58d1d02ebe0bf9a363401db27cd517e4566f05)

**Script path (BitGo).**

```
witness:
  <sig A> 30b7a5159d8d1f85b3dc2d0b7eab8aed9e7a379ab26cd586e5bbe59a524567eecabb25dedc60cce4bb2802c9fd4638695a42daa93b8c6bdb1a9007a59d88c000
  <sig B> d28b520400181a40eed41f00d037f95644a7af30673894b891c44e4283af642d3f635cc3ad1e6375817a3c85210b75111b20f4cda12aec3fa2ffb6ec921821c9
  <leaf>  204a9ade5636bd797bddf242ca6ed3f348478fad5a33ad8c27c4abc0e6837af6fead20f2c370aa8773215d0c7fee0ea5c41fe82fe8ab9345d24a30f3e9f679d3e98b5aac
  <control block> c0955ee08652bdd64ad544a9f224ea44117e83a91d8d095a2308169970a588b1cb483cec0a34593ef360f0ef0cf806bac208b5ea79ca535fb736c158649a708cbe
```

Decoded leaf, another 2-of-2:

```
OP_PUSHBYTES_32 4a9ade5636bd797bddf242ca6ed3f348478fad5a33ad8c27c4abc0e6837af6fe
OP_CHECKSIGVERIFY
OP_PUSHBYTES_32 f2c370aa8773215d0c7fee0ea5c41fe82fe8ab9345d24a30f3e9f679d3e98b5a
OP_CHECKSIG
```

`OP_RETURN ∞/21million. Thanks Satoshi! —BitGo`.

### 10. [`0bf67b1f05326afbd613e11631a2b86466ac7e255499f6286e31b9d7d889cee7`](https://mempool.space/tx/0bf67b1f05326afbd613e11631a2b86466ac7e255499f6286e31b9d7d889cee7)

**Script path (BitGo).**

```
witness:
  <sig A> 8b5d395e1243db20e0eb7d420bdaf97c41310ff89a686dac1d03b0d0e99abdba434cde63d629188f31b2fcb734c7a2ba70a1355bc937a7bd0b1b0727bd45259f
  <sig B> 1d55ca777fe1438e1445b2c7c04adbe10eb0c8d31e312d96fe12835274236e2438e11e46fee41b3f051ec38239f0a8a8dba6639f331e8db4811783fa4e9a1d28
  <leaf>  20e70c0f05cb00d2e12ec982b2a1235455b998f8d1411ac213099ea824f52ede0aad20224cf0890ad9f9a5e7510fb2fbe3bb48d2b95c213338beea805cb61ef9ca444dac
  <control block> c08208faad31279e7ff9cd930cde603337c1f99edf80ca9fed8fe4580ed9f08e18e9387d54e1fc4bf93de54ef4d4c7f0113a3d6f80a6f5e82f286b4235866eb884
```

Decoded leaf:

```
OP_PUSHBYTES_32 e70c0f05cb00d2e12ec982b2a1235455b998f8d1411ac213099ea824f52ede0a
OP_CHECKSIGVERIFY
OP_PUSHBYTES_32 224cf0890ad9f9a5e7510fb2fbe3bb48d2b95c213338beea805cb61ef9ca444d
OP_CHECKSIG
```

Same as #9.

`OP_RETURN ∞/21million. Thanks Satoshi! —BitGo`.

### 11. [`f641d5cec89bba69b862f33385d7889cde3a8cf9c7bbc5d30ae609aa06e706c1`](https://mempool.space/tx/f641d5cec89bba69b862f33385d7889cde3a8cf9c7bbc5d30ae609aa06e706c1)

**Script path.**

```
witness:
  <sig A> fcdb234c61fbcebd1fcdf93b05083dafcf6fe9cc6ffa62b4660ed7ef89fac13dc6c2c42586dc05c1e51b31355c0deac7e3d369f035b05f5787b030c239a457b701
  <sig B> 9080342e3b16fd66e9726e309ebd32c39ab7a5ea2aa23dfd617abfd3960dccf416cd59ac74cb3fdb4a82840082e89d1de1de6e75fb3ecfabd8d3c83c2f755441
  <leaf>  200e0e397c9ac6ec9a33a8799a62158a8431c46caf9b187156629e413c142f9741ad204405144efe565453af97794826a9588e9deb146bf337c10bdb6458069a49ec73ac
  <control block> c0fe5ef3dedf023576e0d4caee61cedab6dfd686c01a8fa71c9df10acc3937540f91d66c656a8b4c87a1b78c2f98096336152558b8d342ea5b11ef9d49b79011c5
```

Decoded leaf:

```
OP_PUSHBYTES_32 0e0e397c9ac6ec9a33a8799a62158a8431c46caf9b187156629e413c142f9741
OP_CHECKSIGVERIFY
OP_PUSHBYTES_32 4405144efe565453af97794826a9588e9deb146bf337c10bdb6458069a49ec73
OP_CHECKSIG
```

No `OP_RETURN`.

### 12. [`445f592c71e364670ecf8d168eb651319d1fc17527df7addd35aa09555733cd6`](https://mempool.space/tx/445f592c71e364670ecf8d168eb651319d1fc17527df7addd35aa09555733cd6)

**Script path (anyone-can-spend leaf).**

```
witness:
  <leaf>  51
  <control block> c00000000000000000000000000000000000000000000000000000000000000001
```

The revealed leaf is a single byte, `0x51`, which is `OP_1`:

```
OP_1
```

That is an always-true script, so the leaf is effectively anyone-can-spend, and again the internal key is the well-known `0x0000…0001`. No signature needed, no `OP_RETURN`.

### 13. [`e4a0b6763cdf1483054068e951a67ec1ea20eb6a39ca3903b8248fc7b3dcb89c`](https://mempool.space/tx/e4a0b6763cdf1483054068e951a67ec1ea20eb6a39ca3903b8248fc7b3dcb89c)

**Key path.**

```
witness:
  91677848e270b88de3df0d6ccd9b21a8ae8abd7e17dee47f2a0fa1673f540647
  29eef2ed7382776b23982a038054ce144fcb5594509ac96553c8a3aa301985b0
```

Single 64-byte Schnorr signature. No `OP_RETURN`.

### 14. [`2f81a1057be3e70231575dde884fdf961172ed17dedab463f08fefc4a48d2dad`](https://mempool.space/tx/2f81a1057be3e70231575dde884fdf961172ed17dedab463f08fefc4a48d2dad)

**Key path.**

```
witness:
  77d1d389eb3b4af619d611b5af135426052c92bfb2e9d5a49f6c7d73d8f011a5
  50128d1fe36cbcbbfdc905b41cae9c56cebc626fa667d7d9ed9d67d6b00465b201
```

Single 65-byte Schnorr signature. No `OP_RETURN`.

### 15. [`d3eccbf9363424016130eacc13f8f9523553fd01a335cce1047b1e331de811ff`](https://mempool.space/tx/d3eccbf9363424016130eacc13f8f9523553fd01a335cce1047b1e331de811ff)

**Key path.**

```
witness:
  fed8253bf7989361f3baa8570b4efdb567439f3e8e72ebae35ebdc823fc7c923
  6793f595a3598bf49eca92389c604aa64538232fde79ab5323b956b48a8a073e
```

Single 64-byte Schnorr signature. No `OP_RETURN`.

### 16. [`01932656b78fddd4a2b05d099c9032fc429cfa63ec3828cb601c620834acf081`](https://mempool.space/tx/01932656b78fddd4a2b05d099c9032fc429cfa63ec3828cb601c620834acf081)

**Key path.**

```
witness:
  bec608d4cba3a5cc62e5f23f93dc10890b1f56a086fbfd59f4786f6f70a25101
  4dd3fb29cab7727bb9a52339100b9fea494b4727e9d9b67f44cbeef44f6f8b28
```

Single 64-byte Schnorr signature. No `OP_RETURN`.
