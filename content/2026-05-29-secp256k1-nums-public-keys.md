---
title: "secp256k1 NUMS Public Keys"
description: "A NUMS point is a public key that provably has no known private key. Here's why that's useful, how it works on secp256k1, and where Bitcoin's Taproot relies on one."
date: 2026-05-29
---

# What does NUMS even mean?

NUMS stands for "Nothing Up My Sleeve". The name comes from the magician's gesture of rolling up their sleeves to prove there's nothing hidden in them before a trick. In cryptography we borrow the idea to talk about constants that are built in such an obvious, boring way that nobody could have rigged them.

If you want a great primer on the idea, Computerphile has a video on it: [Magic "Nothing Up My Sleeve" Numbers](https://youtu.be/oJWwaQm-Exs).

Whenever an algorithm needs a "random looking" constant, the person choosing it could, in theory, pick a value that secretly gives them an advantage (a [backdoor](https://www.schneier.com/essays/archives/2007/11/did_nsa_put_a_secret.html), a shortcut, a way to cheat later). A NUMS value sidesteps that suspicion by being derived from something everyone already trusts, like the digits of pi or the hash of a well known string. The construction is the proof: anyone can recompute it and see there was no room to cheat.

# A NUMS key on secp256k1

[secp256k1](https://en.bitcoin.it/wiki/Secp256k1) is the elliptic curve Bitcoin uses. On that curve, a private key is just a number (technically a scalar in the range `1` to `n - 1`, where `n` is the order of the curve), and the matching public key is that number multiplied by a fixed point called the generator `G`. The whole thing is secure because going backwards (figuring out the private key from the public key) is computationally hopeless. That's the [discrete logarithm problem](https://math.mit.edu/classes/18.783/2022/LectureNotes9.pdf).

A NUMS key flips the usual goal on its head. Normally you want a public key whose private key only **you** know. A NUMS key is a public key whose private key **nobody** knows, including the person who created it.

How do you get a point on the curve that no one has the private key for? You don't pick a number and multiply. Instead you take some unquestionable value, treat it as if it were the x coordinate of a point, and find the matching point on the curve (thanks to secp256k1's equation `y² = x³ + 7`, that just means solving for `y = √(x³ + 7) mod p`, when a square root exists). And since the value came from something public and arbitrary, you couldn't have worked backwards from a private key you secretly kept either. There is still some private key behind that point (every point on the curve has one), but the only way to find it is to solve that discrete logarithm problem, so your odds of landing on a matching key are about 1 in `n`, the curve order, or roughly 1 in `2²⁵⁶`.

# So how is this useful?

The cleanest real world example is [Taproot](https://learnmeabitcoin.com/technical/upgrades/taproot/).

A Taproot output can be spent two ways: the "key path" (a normal signature) or the "script path" (one of several spending conditions hidden in a tree). Sometimes you want a coin that can **only** be spent through the scripts, with the key path completely disabled.

![Diagram of how a Taproot output is built: a script tree of leaves and branches reduces to a merkle root, which is combined with a public key to produce a tweak and a final tweaked public key.](/images/taproot-summary.webp)

*Taproot Summary, from learnmeabitcoin.com.*

To do that, you need a public key that genuinely has no known private key, otherwise whoever knows that key could bypass all your carefully written scripts. So [BIP-341](https://bips.dev/341/) specifies a NUMS point for exactly this purpose. It's built by hashing the standard generator point and lifting the result to the curve:

```
H = lift_x(0x50929b74c1a04954b78b4b6035e97a5e078a5a0f28ec96d547bfee9ace803ac0)
```

That hex value is the SHA256 of the encoded generator `G`. Anyone can recompute it in a couple of lines and confirm it wasn't cherry picked. Because it came out of a hash, no one knows (or can know) the corresponding private key, so the key path is provably dead and only the scripts can move the coins.

Here's the whole thing in [SageMath](https://sagecell.sagemath.org/?z=eJydk12Lm0AUhu8F_8Mhy7LaLkHHGWcs9CIaTXrRFrr0qi3LfJlIjZHRlOy_76jJZlO2FOqFqHM-3nOe12rX7k0PW95t60q4Tmn2O-j4Rs95XUM1nRZVU_W6qHSt7iGv66rtK5kdzC99Dx-aXm-0cR3XuYFOyxaR-GcILTd8p3ttOtcp4P3LEt4pxQuOxf9d-XjPUOH7rtPY6v-slKeLRb7M8nhRYLYIojQtlojkLFsGUYxDHALcgBwmgr1Rwzi5LXs1qvetuCj3_Xu4vFLf_-FPG_hsqk3V8Bo2utGG93sD7b5qelhB1cChkftda3TXaQXl3ux47zqrx2X-xXa7CzBNhI5jqstESSG4JIQHMUqI1IwGIqABSkQplUBKasRUQpISsZCIMC5ZSBOGWcQVpxTFPJI4JkRxXNqMQIdhwDgrVUgFxozHjBAcJonEVAWsLEUYKCzY3TTESvewPukWT6M5qmYDK9dZD1uZ11XZPx69wrMB3sk6827LLXpPPPW6mw822uqjN87m-3P7rKqN7nrPLi6M_QFca4b02Rq8T18_PoDgnZ56-rbJ7Dng7vYIt8c7uIX1_Pjk-f5Z47hfDZ3kNTcwGbc3g9DZoela3Sguaj1zHWPrnVG9ovgqeq4tIqW9VzRbBc1F9vfmYWpsrtQOQ5uLxh767WCpkylW04CW-fUegyNN0tySz4tkmaXpIiNkMZLPcks-HcmnRbZMkTUxYktLvhjIp2FcjOTPLTNey0M97MVYXGboY-DNgO76tBz1jIsfJb2zwN-OOePJY3PYdTb3_PF56OKPPPCmkL8xu1R7CW_Mfw8siojAKMSRUjFVHGnJpGAisWallMqIhML-E0lk_wXESUR5gEVJkRY0SmL-GzVpXyA=&lang=sage&interacts=eJyLjgUAARUAuQ==): derive the base point `H` from `G`, add `r * G` for a scalar `r` that itself comes from hashing a string, and you get a NUMS point that nobody holds the key for.

```python
import hashlib
from sage.all import FiniteField, EllipticCurve, Integer

# secp256k1 parameters
F = FiniteField(Integer(0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F))
n = 0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141  # curve order
E = EllipticCurve([F(Integer(0)), F(Integer(7))])

# Original generator point G in uncompressed format
G_DER = '0479be667ef9dcbbac55a06295ce870b07029bfcdb2dce28d959f2815b16f81798483ada7726a3c4655da4fbfc0e1108a8fd17b448a68554199c47d08ffb10d4b8'

# Get H point by hashing G
H = E.lift_x(F(int(hashlib.sha256(bytes.fromhex(G_DER)).hexdigest(), 16)))
print("H (NUMS base point) = ")
print('%x %x' % H.xy())

# Generate scalar from string "unspendable"
r = Integer(int(hashlib.sha256("unspendable".encode()).hexdigest(), 16) % n)
print("\nScalar r = ")
print(hex(r))

# Get the original G point
G = E.lift_x(F(0x79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798))

# Calculate rG
rG = r * G

# Calculate final NUMS point: H + rG
final_nums = H + rG
print("\nFinal NUMS point (H + rG) = ")
print('%x %x' % final_nums.xy())

# NUMS = 8335b42143dd67da2ec8cb8b9108777c351b47993bba2a537a04bf72eb7396a
```

Our first example is [Labitbu](https://github.com/stutxo/labitbu). Rather than lifting one fixed hash to the curve, it hashes a tag together with a counter and reads the digest straight off as an x-only key: `PK = SHA256(tag || ctr)`. The tag is just a label string (here, `Labitbu`, so the call is `nums_from_tag(b"Labitbu")`) that domain-separates the key so it can't coincide with one derived for some other purpose, and the counter is bumped until the digest lands on a valid x coordinate. You can [check the resulting point](https://nums-secp256k1.jaonoctus.dev/?pk=96053db5b18967b5a410326ecca687441579225a6d190f398e2180deec6e429e&method=TAGGED_HASH_KEY&input=Labitbu) in the NUMS explorer.

```rust
fn nums_from_tag(tag: &[u8]) -> XOnlyPublicKey {
    let mut ctr = 0u32;
    loop {
        let mut eng = sha256::Hash::engine();
        eng.input(tag);
        eng.input(&ctr.to_le_bytes());
        let candidate = sha256::Hash::from_engine(eng);

        if let Ok(pk) = XOnlyPublicKey::from_slice(&candidate[..]) {
            return pk;
        }
        ctr += 1;
    }
}
```

*Source: [labitbu/src/lib.rs](https://github.com/stutxo/labitbu/blob/74350eab52a4a097dcdfb07b652d840d5767c8c5/src/lib.rs#L394-L407).*

Another project leaning on the same trick is [Strata](https://www.stratabtc.org/), from [Alpen Labs](https://www.alpenlabs.io/). It takes the most minimal route of all: no counter, no tweak, not even an explicit curve lift. It hashes the label `Strata unspendable` with plain SHA256 and feeds the 32-byte digest straight in as an x-only public key. An x-only key *is* an x coordinate, so this works as long as the digest lands on the curve, and `from_slice` would reject it (panicking on the `expect`) if it hadn't:

```rust
pub const UNSPENDABLE_PUBLIC_KEY_INPUT: &[u8] = b"Strata unspendable";
pub static UNSPENDABLE_PUBLIC_KEY: LazyLock<XOnlyPublicKey> = LazyLock::new(|| {
    XOnlyPublicKey::from_slice(sha256::Hash::hash(UNSPENDABLE_PUBLIC_KEY_INPUT).as_byte_array())
        .expect("valid xonly public key")
});
```

*Source: [strata-common/crates/crypto/src/keys/constants.rs](https://github.com/alpenlabs/strata-common/blob/f93a3b7c4f2381dca87354aa59ebadbc4bc40755/crates/crypto/src/keys/constants.rs#L69-L83).*

# The takeaway

Most public keys matter because someone holds the secret behind them. A NUMS key matters for the opposite reason: nobody does, and anyone can check that for themselves.

That second half is the whole game. The three constructions above look nothing alike (a hash lifted to the curve, a tagged hash with a counter, a bare SHA256 read straight off as an x coordinate), yet they earn the same property the same way: the recipe is public, so the result couldn't have been rigged. No trusted setup to believe in, no "just take our word for it." The construction is the proof.

So when a protocol needs "nobody should be able to do this" to be a fact instead of a promise, a NUMS key is how you write it down.

*PS: until a quantum computer breaks this shit. `:D`*
