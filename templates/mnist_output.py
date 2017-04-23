def mnist_out(epochs, batch_size, net):
    init_op = tf.global_variables_initializer()

    train_step = tf.train.GradientDescentOptimizer(0.5).minimize(net)

    with tf.Session() as sess:
        sess.run(init_op)
        # Train
        for _ in range(epochs):
            batch_xs, batch_ys = mnist.train.next_batch(batch_size)
            sess.run(train_step, feed_dict={x: batch_xs, y_: batch_ys})

            # Test trained model
            correct_prediction = tf.equal(tf.argmax(net.y, 1), tf.argmax(net.y_, 1))

            accuracy = tf.reduce_mean(tf.cast(correct_prediction, tf.float32))

            print(sess.run(accuracy, feed_dict={x: mnist.test.images, y_: mnist.test.labels}))
