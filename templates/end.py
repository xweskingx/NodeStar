def mnist_out(epochs, batch_size, net):
    init_op = tf.global_variables_initializer()

    with tf.Session() as sess:
        sess.run(init_op)
        # Train
        for _ in range(epochs):
            batch_xs, batch_ys = mnist.train.next_batch(batch_size)

            sess.run(net.optimize, feed_dict={x: batch_xs, y: batch_ys})

            # Test trained model

        print(sess.run(net.error, feed_dict={x: mnist.test.images, y: mnist.test.labels}))

if __name__ == '__main__':
    x = tf.placeholder(tf.float32, [None, 784])
    y = tf.placeholder(tf.float32, [None, 10])

    net = Dense(x, y, in_dims=784, out_dims=10)

    mnist_out(1000, 100, net)
